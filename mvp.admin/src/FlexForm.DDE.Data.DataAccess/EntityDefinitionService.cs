using FlexForm.Api.Common.Helpers;
using FlexForm.DDE.Data.DataAccess.DbContexts;
using FlexForm.DDE.Data.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlexForm.DDE.Data.DataAccess
{
    public class EntityDefinitionService : IEntityDefinitionService
    {
        private readonly FlexFormDbContext _context;

        public EntityDefinitionService(FlexFormDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<EntityDefinition>> GetEntityDefinitions()
        {
            var entityDefinitions = await _context.EntityDefinitions
                .Include(e => e.FieldDefinitions)
                .ThenInclude(f => f.ItemSourceDefinition)
                .OrderBy(p => p.Name)
                .AsNoTracking()
                .ToListAsync();

            var references = await _context.EntityDefinitions
                .Select(d => new { d.Id, HasEntityInstances = d.EntityInstances.Any(), HasFormDefinitions = d.FormDefinitions.Any() })
                .ToDictionaryAsync(d => d.Id);

            entityDefinitions
                .ForEach(d =>
                {
                    d.HasEntityInstances = references[d.Id].HasEntityInstances;
                    d.HasFormDefinitions = references[d.Id].HasFormDefinitions;
                });

            return entityDefinitions;
        }

        public async Task<EntityDefinition> GetEntityDefinition(int id)
        {
            var entityDefinition = await _context.EntityDefinitions
                .Include(p => p.FieldDefinitions)
                .ThenInclude(f => f.ItemSourceDefinition)
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);

            if (entityDefinition != null)
            {
                var references = await _context.EntityDefinitions
                    .Where(d => d.Id == entityDefinition.Id)
                    .Select(d => new { HasEntityInstances = d.EntityInstances.Any(), HasFormDefinitions = d.FormDefinitions.Any() })
                    .FirstAsync();
                entityDefinition.HasEntityInstances = references.HasEntityInstances;
                entityDefinition.HasFormDefinitions = references.HasFormDefinitions;
            }

            return entityDefinition;
        }

        public async Task<EntityDefinition> SaveEntityDefinition(EntityDefinition entityDefinition)
        {
            EntityDefinition originalEntityDefinition = null;
            if (entityDefinition.Id != default)
            {
                originalEntityDefinition = await GetEntityDefinition(entityDefinition.Id);

                // If the original one does not exist, can not modify
                if (originalEntityDefinition == null)
                {
                    throw new Exception($"FormDefinition {entityDefinition.Id} does not exist, can not modify");
                }

                // Check whether the form has used in instances
                if (originalEntityDefinition.HasEntityInstances || originalEntityDefinition.HasFormDefinitions)
                {
                    // If the form already has used, clear the IDs and insert new item
                    originalEntityDefinition = null;
                    entityDefinition.Id = default;
                    entityDefinition.FieldDefinitions
                        .ToList()
                        .ForEach(f =>
                        {
                            f.Id = default;
                            if (f.ItemSourceDefinition != null)
                            {
                                f.ItemSourceDefinitionId = default;
                                f.ItemSourceDefinition.Id = default;
                            }
                        });
                    entityDefinition.Name += "_copy";
                }
            }

            // Empty non persisted properties
            entityDefinition.EntityInstances = null;
            entityDefinition.FormDefinitions = null;

            _context.Update(entityDefinition);

            // TODO The ChangeTracker has a bug inserting Identity column, when it is fixed, add this way back instead of Update
            //_context.ChangeTracker.TrackGraph(entityDefinition, e =>
            //{
            //    e.Entry.State = EntityState.Unchanged;

            //    var entity = e.Entry.Entity;
            //    if (entity is EntityDefinition ||
            //        entity is FieldDefinition ||
            //        entity is ItemSourceDefinition)
            //    {
            //        _context.Entry(entity).State = e.Entry.IsKeySet ? EntityState.Modified : EntityState.Added;
            //    }
            //});

            if (originalEntityDefinition != null)
            {
                originalEntityDefinition.FieldDefinitions
                    .ToList()
                    .ForEach(f =>
                    {
                        var existingFieldDefinition = entityDefinition.FieldDefinitions.FirstOrDefault(d => d.Id == f.Id);

                        if (existingFieldDefinition == null)
                        {
                            // Delete removed FieldDefinitions and their ItemsOurceDefinition
                            var fieldToRemove = AsyncHelper.RunSync(() => _context.FieldDefinitions
                                .Include(i => i.ItemSourceDefinition)
                                .FirstOrDefaultAsync(i => i.Id == f.Id));

                            if (fieldToRemove.ItemSourceDefinition != null)
                            {
                                _context.Remove(fieldToRemove.ItemSourceDefinition);
                            }
                            _context.Remove(fieldToRemove);
                        }
                        else if (f.ItemSourceDefinitionId != existingFieldDefinition.ItemSourceDefinitionId &&
                            f.ItemSourceDefinition != null)
                        {
                            // If existing FieldDefinition but ItemsOurceDefinition is empty or new, delete the recent ItemSourceDefinition if it exists
                            var itemSourceToRemove = AsyncHelper.RunSync(() => _context.ItemSourceDefinitions.FindAsync(f.ItemSourceDefinitionId));
                            _context.Remove(itemSourceToRemove);
                        }
                    });
            }

            await _context.SaveChangesAsync();

            return entityDefinition;
        }

        public async Task<int> DeleteEntityDefinition(int id)
        {
            var entityDefinition = await GetEntityDefinition(id);

            if (entityDefinition == null)
            {
                return await Task.FromResult(0);
            }

            entityDefinition.FieldDefinitions
                .ToList()
                .ForEach(f =>
                {
                    _context.Remove(f);
                    if (f.ItemSourceDefinition != null)
                    {
                        _context.Remove(f.ItemSourceDefinition);
                    }
                });

            _context.Remove(entityDefinition);

            return await _context.SaveChangesAsync();
        }
    }
}
