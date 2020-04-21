using FlexForm.Api.Admin.Utils;
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
    [Route("api/v1/testdata")]
    [ApiController]
    public class TestDataContoller : ControllerBase
    {
        private readonly RandomEntityHelper _randomEntityHelper;

        public TestDataContoller(RandomEntityHelper randomEntityHelper)
        {
            _randomEntityHelper = randomEntityHelper;
        }

        [HttpPost("itemsource")]
        public async Task<ActionResult<IEnumerable<Dictionary<string, object>>>> CreateEntitySource(ItemSourceDefinition itemSourceDefinition)
        {
            try
            {
                var entities = await _randomEntityHelper.CreateRandomEntitySource(itemSourceDefinition.ItemSourceEntityDefinitionId, itemSourceDefinition.PageSize, 3);

                return Ok(entities);
            }
            catch (Exception ex)
            {
                Logger.Writer().Error($"An error occured while creating test data for item source.", ex);

                return StatusCode(500);
            }
        }

        [HttpGet("entityinstance/{id}")]
        public async Task<ActionResult<Dictionary<string, object>>> Get(int id)
        {
            try
            {
                var entity = await _randomEntityHelper.CreateRandomEntity(id, 3);

                return Ok(entity);
            }
            catch (Exception ex)
            {
                Logger.Writer().Error($"An error occured while creating test data for entity instance.", ex);

                return StatusCode(500);
            }
        }

        [HttpGet("referenceformdefinition")]
        public ActionResult<Dictionary<string, object>> GetReferenceForm()
        {
            var result = FormDefinitionHelper.GetFormWithEntityReferenceAndEntityCollection();

            return Ok(result);
        }
    }
}
