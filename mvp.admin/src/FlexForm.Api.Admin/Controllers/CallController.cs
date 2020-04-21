using FlexForm.Api.Common;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace FlexForm.Api.Admin.Controllers
{
    [Route("api/v1/calltest")]
    [ApiController]
    //[Authorize]
    public class CallController : ControllerBase
{
    private readonly DdeHttpClient _mockHttpClient;

    public CallController(DdeHttpClient mockHttpClient)
    {
        _mockHttpClient = mockHttpClient;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<string>> CallApi()
    {
        var user = User;

        var roles = user?.Claims.ToList();

        var token = await HttpContext.GetTokenAsync("access_token");

        //var mockClient = await _mockHttpClient.GetCientWithToken(HttpContext);
        //var response = await mockClient.GetStringAsync("/api/values");

        return token;
    }
}
}