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
    [Route("api/v1/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserAdminService _userAdminService;

        public UserController(IUserAdminService userAdminService)
        {
            _userAdminService = userAdminService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserModel>>> Get()
        {
            try
            {
                var users = await _userAdminService.GetUsers();
                var models = Mapper.Map<List<UserModel>>(users);

                return Ok(models);
            }
            catch (Exception ex)
            {
                Logger.Writer().Error($"An error occured while listing Users.", ex);

                return StatusCode(500);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> Get(Guid id)
        {
            try
            {
                var user = await _userAdminService.GetUser(id);

                if (user == null)
                {
                    return NotFound();
                }
                var userModel = Mapper.Map<UserModel>(user);

                return Ok(userModel);
            }
            catch (Exception ex)
            {
                Logger.Writer().Error($"An error occured while getting User.", ex);

                return StatusCode(500);
            }
        }

        [HttpPost]
        public async Task<ActionResult<UserModel>> Post([FromBody] UserSaveModel userModel)
        {
            try
            {
                var user = await _userAdminService.SaveUser(Mapper.Map<User>(userModel));

                return Ok(Mapper.Map<UserModel>(user));
            }
            catch (Exception ex)
            {
                Logger.Writer().Error($"An error occured while saving User.", ex);

                return StatusCode(500);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> LockOut(Guid id)
        {
            try
            {
                var result = await _userAdminService.LockOutUser(id);

                if (!result.Succeeded)
                {
                    return NotFound();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                Logger.Writer().Error($"An error occured while locking out User.", ex);

                return StatusCode(500);
            }
        }

        [HttpPost("passwordreset")]
        public async Task<IActionResult> ResetPassword()
        {
            await Task.Yield();
            throw new NotImplementedException();
        }

        [HttpGet("activity")]
        public async Task<IActionResult> GetUserActivity(Guid id)
        {
            await Task.Yield();
            throw new NotImplementedException();
        }

        [HttpPost("membership")]
        public async Task<IActionResult> GrantUser([FromBody] UserPermissionModel model)
        {
            try
            {
                var result = await _userAdminService.GrantUser(model.UserId, model.UserGroupId);

                if (!result.Succeeded)
                {
                    return NotFound();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                Logger.Writer().Error($"An error occured while locking out User.", ex);

                return StatusCode(500);
            }
        }

        [HttpDelete("membership")]
        public async Task<IActionResult> RevokeUser([FromBody] UserPermissionModel model)
        {
            try
            {
                var result = await _userAdminService.RevokeUser(model.UserId, model.UserGroupId);

                if (!result.Succeeded)
                {
                    return NotFound();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                Logger.Writer().Error($"An error occured while locking out User.", ex);

                return StatusCode(500);
            }
        }
    }
}
