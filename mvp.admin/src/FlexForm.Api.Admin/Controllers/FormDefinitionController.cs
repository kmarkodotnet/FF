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
    [Route("api/v1/formdefinition")]
    [ApiController]
    public class FormDefinitionController : ControllerBase
    {
        private readonly IFormAdminService _formAdminService;

        public FormDefinitionController(IFormAdminService formAdminService)
        {
            _formAdminService = formAdminService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FormDefinitionModel>>> Get()
        {
            try
            {
                var result = await _formAdminService.GetFormDefinitions();
                var models = Mapper.Map<List<FormDefinitionModel>>(result);

                return Ok(models);
            }
            catch (Exception ex)
            {
                Logger.Writer().Error($"An error occured while listing FormDefinitions.", ex);

                return StatusCode(500);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FormDefinitionModel>> Get(int id)
        {
            try
            {
                var result = await _formAdminService.GetFormDefinition(id);
                if (result == null)
                {
                    return NotFound();
                }
                var model = Mapper.Map<FormDefinitionModel>(result);

                return Ok(model);
            }
            catch (Exception ex)
            {
                Logger.Writer().Error($"An error occured while getting FormDefinition.", ex);

                return StatusCode(500);
            }
        }

        [HttpPost]
        public async Task<ActionResult<FormDefinitionModel>> Post([FromBody] FormDefinitionModel formDefinition)
        {
            try
            {
                var entity = Mapper.Map<FormDefinition>(formDefinition);
                var result = await _formAdminService.SaveFormDefinition(entity);
                formDefinition = Mapper.Map<FormDefinitionModel>(result);

                return Ok(formDefinition);
            }
            catch (Exception ex)
            {
                Logger.Writer().Error($"An error occured while saving FormDefinition.", ex);

                return StatusCode(500);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _formAdminService.DeleteFormDefinition(id);

                return Ok();
            }
            catch (Exception ex)
            {
                Logger.Writer().Error($"An error occured while deleting FormDefinition.", ex);

                return StatusCode(500);
            }
        }
    }
}
