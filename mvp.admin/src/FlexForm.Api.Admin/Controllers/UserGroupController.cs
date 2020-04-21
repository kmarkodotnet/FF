using AutoMapper;
using FlexForm.Api.Admin.Model;
using FlexForm.Api.Common;
using FlexForm.Identity.Common.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NetAppDev.Common.Diagnostic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlexForm.Api.Admin.Controllers
{
    [AllowAnonymous]
    [Route("api/v1/usergroup")]
    [ApiController]
    public class UserGroupController : ControllerBase
    {
        private readonly IUserAdminService _userAdminService;

        public UserGroupController(IUserAdminService userAdminService)
        {
            _userAdminService = userAdminService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserGroupModel>>> Get()
        {
            try
            {
                var userGroups = await _userAdminService.GetUserGroupsWithMembers();
                var models = Mapper.Map<List<UserGroupModel>>(userGroups);

                models.ForEach(m =>
                {
                    var members = userGroups
                        .Where(g => g.Id == m.Id)
                        .SelectMany(g => g.UserGroupMembers.Select(ugm => ugm.User));
                    m.UsersInGroup = Mapper.Map<List<UserModel>>(members);
                    m.UsersInGroup
                        .ToList()
                        .ForEach(g => g.UserGroups = null);
                });

                return Ok(models);
            }
            catch (Exception ex)
            {
                Logger.Writer().Error($"An error occured while listing UserGroups.", ex);

                return StatusCode(500);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserGroupModel>> Get(Guid id)
        {
            try
            {
                var applicationRole = await _userAdminService.GetApplicationRole(id);
                if (applicationRole == null)
                {
                    return NotFound();
                }
                var roleModel = Mapper.Map<UserGroupModel>(applicationRole);

                var userGroup = await _userAdminService.GetUserGroupWithMembers(applicationRole.Id);

                roleModel.UsersInGroup = Mapper.Map<List<UserModel>>(userGroup.Users);

                return Ok(roleModel);
            }
            catch (Exception ex)
            {
                Logger.Writer().Error($"An error occured while getting UserGroup.", ex);

                return StatusCode(500);
            }
        }

        [HttpPost]
        public async Task<ActionResult<UserGroupModel>> Post([FromBody] UserGroupSaveModel model)
        {
            try
            {
                var result = await _userAdminService.SaveApplicationRole(Mapper.Map<ApplicationRole>(model));
                if (!result.Succeeded)
                {
                    Logger.Writer().Error($"An error occured while creating UserGroup.", null);

                    return UnprocessableEntity(result.Errors.FirstOrDefault()?.Description);
                }

                var applicationRole = await _userAdminService.GetApplicationRole(model.Name);
                return Ok(Mapper.Map<UserGroupModel>(applicationRole));
            }
            catch (Exception ex)
            {
                Logger.Writer().Error($"An error occured while saving UserGroup.", ex);

                return StatusCode(500);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                var userGroup = await _userAdminService.GetUserGroup(id);
                if (userGroup == null)
                {
                    return NotFound();
                }

                // Check whether the role already used
                var isUserGroupUsed = await _userAdminService.IsUserGroupUsed(id);
                if (isUserGroupUsed)
                {
                    return Forbid("UserGroup is used");
                }

                var result = await _userAdminService.DeleteApplicationRole(id);
                if (!result.Succeeded)
                {
                    return UnprocessableEntity();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                Logger.Writer().Error($"An error occured while deleting UserGroup.", ex);

                return StatusCode(500);
            }
        }
    }
}
