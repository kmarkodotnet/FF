using AutoMapper;
using FlexForm.Api.Common;
using FlexForm.Api.Settings.Model;
using FlexForm.DDE.Data.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NetAppDev.Common.Diagnostic;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FlexForm.Api.Settings.Controllers
{
    [AllowAnonymous]
    [Route("api/v1/settings")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly ISettingsService _settingsService;

        public SettingsController(ISettingsService settingsService)
        {
            _settingsService = settingsService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SettingsModel>> Get(int id)
        {
            try
            {
                var settings = await _settingsService.GetUserSettings(id);

                if (settings == null)
                {
                    return NotFound();
                }
                var settingsModel = Mapper.Map<SettingsModel>(settings);

                return Ok(settingsModel);
            }
            catch (Exception ex)
            {
                Logger.Writer().Error($"An error occured while getting user settings.", ex);

                return StatusCode(500);
            }
        }

        [HttpGet("globalsettings/{name}")]
        public async Task<ActionResult<SettingsModel>> GetGlobalSettings(string name)
        {
            try
            {
                var settings = await _settingsService.GetGlobalSettings(name);

                if (settings == null)
                {
                    return NotFound();
                }
                var settingsModel = Mapper.Map<List<SettingsModel>>(settings);

                return Ok(settingsModel);
            }
            catch (Exception ex)
            {
                Logger.Writer().Error($"An error occured while getting global settings.", ex);

                return StatusCode(500);
            }
        }

        [HttpGet("usersettings/{name}/{userId}")]
        public async Task<ActionResult<SettingsModel>> GetUserSettings(string name, Guid userId)
        {
            try
            {
                var settings = await _settingsService.GetUserSettings(name, userId);

                if (settings == null)
                {
                    return NotFound();
                }
                var settingsModel = Mapper.Map<SettingsModel>(settings);

                return Ok(settingsModel);
            }
            catch (Exception ex)
            {
                Logger.Writer().Error($"An error occured while getting user settings.", ex);

                return StatusCode(500);
            }
        }

        [HttpPost]
        public async Task<ActionResult<SettingsModel>> Post([FromBody] SettingsModel settings)
        {
            try
            {
                var entity = Mapper.Map<UserSettings>(settings);
                var result = await _settingsService.SaveUserSettings(entity);
                settings = Mapper.Map<SettingsModel>(result);

                return Ok(settings);
            }
            catch (Exception ex)
            {
                Logger.Writer().Error($"An error occured while saving settings.", ex);

                return StatusCode(500);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _settingsService.DeleteUserSettings(id);

                return Ok();
            }
            catch (Exception ex)
            {
                Logger.Writer().Error($"An error occured while deleting settings.", ex);

                return StatusCode(500);
            }
        }
    }
}
