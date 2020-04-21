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
    public class FormDefinitionService : IFormDefinitionService
    {
        private readonly FlexFormDbContext _context;

        public FormDefinitionService(FlexFormDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<FormDefinition>> GetFormDefinitions()
        {
            var formDefinitions = await _context.FormDefinitions
                .Include(p => p.EntityDefinition)
                .Include(p => p.FormControls)
                    .ThenInclude(p => p.FormControlBinding)
                    .ThenInclude(p => p.FieldDefinition)
                .Include(p => p.FormControls)
                    .ThenInclude(f => f.SubFormDefinition)
                .OrderBy(p => p.FormName)
                .AsNoTracking()
                .ToListAsync();

            var references = await _context.FormDefinitions
                .Select(d => new { d.Id, HasEntityInstances = d.EntityInstanceArchives.Any() })
                .ToDictionaryAsync(d => d.Id);

            formDefinitions
                .ForEach(d => d.HasEntityInstances = references[d.Id].HasEntityInstances);

            return formDefinitions;
        }

        public async Task<FormDefinition> GetFormDefinition(int id)
        {
            var formDefinition = await LoadFormDefinition(id);

            if (formDefinition != null)
            {
                formDefinition.HasEntityInstances = await _context.FormDefinitions
                    .Where(d => d.Id == formDefinition.Id)
                    .Where(d => d.EntityInstanceArchives.Any())
                    .AnyAsync();
            }

            return formDefinition;
        }

        public async Task<FormDefinition> SaveFormDefinition(FormDefinition formDefinition)
        {
            FormDefinition originalFormDefinition = null;
            if (formDefinition.Id != default)
            {
                originalFormDefinition = await GetFormDefinition(formDefinition.Id);

                // If the original one does not exist, can not modify
                if (originalFormDefinition == null)
                {
                    throw new Exception($"FormDefinition {formDefinition.Id} does not exist, can not modify");
                }

                // Check whether the form has used in instances
                if (originalFormDefinition.HasEntityInstances)
                {
                    // If the form already has used, clear the IDs and insert new item
                    originalFormDefinition = null;
                    formDefinition.Id = default;
                    formDefinition.FormControls
                        .ToList()
                        .ForEach(c =>
                        {
                            c.Id = default;
                            if (c.FormControlItemSource != null)
                            {
                                c.FormControlItemSourceId = default;
                                c.FormControlItemSource.Id = default;
                            }
                            if (c.FormControlBinding != null)
                            {
                                c.FormControlBinding.Id = default;
                            }
                        });
                    formDefinition.FormName += "_copy";
                }
            }

            // Empty non persisted properties
            formDefinition.EntityInstanceArchives = null;
            formDefinition.FormPermissions = null;
            formDefinition.FormTypeConstraint = null;
            formDefinition.ValidationRuleFormDefinitions = null;

            _context.Update(formDefinition);

            // TODO The ChangeTracker has a bug inserting Identity column, when it is fixed, add this way back instead of Update
            //_context.ChangeTracker.TrackGraph(formDefinition, e =>
            //{
            //    e.Entry.State = EntityState.Unchanged;

            //    var entity = e.Entry.Entity;
            //    if (entity is FormDefinition ||
            //        entity is FormControl ||
            //        entity is FormControlBinding ||
            //        entity is ItemSourceDefinition)
            //    {
            //        _context.Entry(entity).State = e.Entry.IsKeySet ? EntityState.Modified : EntityState.Added;
            //    }
            //});

            if (originalFormDefinition != null)
            {
                originalFormDefinition.FormControls
                    .ToList()
                    .ForEach(f =>
                    {
                        var existingFormControl = formDefinition.FormControls.FirstOrDefault(c => c.Id == f.Id);

                        if (existingFormControl == null)
                        {
                            // Delete removed FormControl and their FormControlBindings
                            var formControlToRemove = AsyncHelper.RunSync(() => _context.FormControls
                                .Include(p => p.FormControlBinding)
                                .Include(p => p.FormControlItemSource)
                                .FirstOrDefaultAsync(i => i.Id == f.Id));
                            if (formControlToRemove.FormControlBinding != null)
                            {
                                _context.Remove(formControlToRemove.FormControlBinding);
                            }
                            if (formControlToRemove.FormControlItemSource != null)
                            {
                                _context.Remove(formControlToRemove.FormControlItemSource);
                            }
                            _context.Remove(formControlToRemove);
                        }
                        else if (f.FormControlItemSourceId != existingFormControl.FormControlItemSourceId &&
                            f.FormControlItemSource != null)
                        {
                            // If existing FormDefinition but ItemsOurceDefinition is empty or new, delete the recent ItemSourceDefinition if it exists
                            var itemSourceToRemove = AsyncHelper.RunSync(() => _context.ItemSourceDefinitions.FindAsync(f.FormControlItemSourceId));
                            _context.Remove(itemSourceToRemove);
                        }
                    });
            }

            await _context.SaveChangesAsync();

            return formDefinition;
        }

        public async Task<int> DeleteFormDefinition(int id)
        {
            var formDefinition = await GetFormDefinition(id);

            if (formDefinition == null)
            {
                return await Task.FromResult(0);
            }

            formDefinition.FormControls
                .ToList()
                .ForEach(fe =>
                {
                    if (fe.FormControlBinding != null)
                    {
                        _context.Remove(fe.FormControlBinding);
                    }
                    _context.Remove(fe);
                });

            _context.Remove(formDefinition);

            return await _context.SaveChangesAsync();
        }


        private async Task<FormDefinition> LoadFormDefinition(int id)
        {
            var formDefinition = await _context.FormDefinitions
                .Include(p => p.FormControls)
                    .ThenInclude(p => p.FormControlBinding)
                .Include(p => p.FormControls)
                    .ThenInclude(p => p.FormControlItemSource)
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);

            if (formDefinition.FormControls.Any(c => c.SubFormDefinitionId.HasValue))
            {
                var subFormControlLoaderTasks =
                formDefinition.FormControls
                .Where(c => c.SubFormDefinitionId.HasValue)
                .Select(c => Task.Run(async () => c.SubFormDefinition = await LoadFormDefinition(c.SubFormDefinitionId.Value)));

                await Task.WhenAll(subFormControlLoaderTasks);
            }

            return formDefinition;
        }
    }
}
