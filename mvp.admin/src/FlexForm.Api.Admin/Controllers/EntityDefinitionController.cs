using AutoMapper;
using FlexForm.Api.Admin.Model;
using FlexForm.Api.Common;
using FlexForm.DDE.Data.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NetAppDev.Common.Diagnostic;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FlexForm.Api.Admin.Controllers
{
    [AllowAnonymous]
    [Route("api/v1/entitydefinition")]
    [ApiController]
    public class EntityDefinitionController : ControllerBase
    {
        private readonly IEntityAdminService _entityAdminService;

        public EntityDefinitionController(IEntityAdminService entityAdminService)
        {
            _entityAdminService = entityAdminService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EntityDefinitionModel>>> Get()
        {
            try
            {
                var result = await _entityAdminService.GetEntityDefinitions();
                var models = Mapper.Map<List<EntityDefinitionModel>>(result);

                return Ok(models);
            }
            catch (Exception ex)
            {
                Logger.Writer().Error($"An error occured while listing EntityDefinitions.", ex);

                return StatusCode(500);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EntityDefinitionModel>> Get(int id)
        {
            try
            {
                var result = await _entityAdminService.GetEntityDefinition(id);
                if (result == null)
                {
                    return NotFound();
                }
                var model = Mapper.Map<EntityDefinitionModel>(result);

                return Ok(model);
            }
            catch (Exception ex)
            {
                Logger.Writer().Error($"An error occured while getting EntityDefinition.", ex);

                return StatusCode(500);
            }
        }

        [HttpPost]
        public async Task<ActionResult<EntityDefinitionModel>> Post([FromBody] EntityDefinitionModel entityDefinition)
        {
            try
            {
                var entity = Mapper.Map<EntityDefinition>(entityDefinition);
                var result = await _entityAdminService.SaveEntityDefinition(entity);
                entityDefinition = Mapper.Map<EntityDefinitionModel>(result);

                return Ok(entityDefinition);
            }
            catch (Exception ex)
            {
                Logger.Writer().Error($"An error occured while saving EntityDefinition.", ex);

                return StatusCode(500);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _entityAdminService.DeleteEntityDefinition(id);

                return Ok();
            }
            catch (Exception ex)
            {
                Logger.Writer().Error($"An error occured while deleting EntityDefinition.", ex);

                return StatusCode(500);
            }
        }
    }
}
