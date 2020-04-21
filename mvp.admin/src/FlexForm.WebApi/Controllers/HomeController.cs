using FlexForm.Api.Common;
using FlexForm.Identity.Common.Attributes;
using FlexForm.WebApi.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;

namespace FlexForm.WebApi.Controllers
{
    [SecurityHeaders]
    public class HomeController : Controller
    {
        private readonly IIdentityServerInteractionService _interaction;
        private readonly IHostingEnvironment _environment;
        private readonly ILogger _logger;
        private readonly DdeHttpClient _mockHttpClient;

        public HomeController(
            IIdentityServerInteractionService interaction,
            IHostingEnvironment environment,
            DdeHttpClient mockHttpClient,
            ILogger<HomeController> logger)
        {
            _interaction = interaction;
            _environment = environment;
            _mockHttpClient = mockHttpClient;
            _logger = logger;
        }

        [AllowAnonymous]
        public IActionResult Index()
        {
            if (_environment.IsDevelopment())
            {
                // only show in development
                return View();
            }

            _logger.LogInformation("Homepage is disabled in production. Returning 404.");
            return NotFound();
        }

        /// <summary>
        /// Shows the error page
        /// </summary>
        [AllowAnonymous]
        public async Task<IActionResult> Error(string errorId)
        {
            var vm = new ErrorViewModel();

            // retrieve error details from identityserver
            var message = await _interaction.GetErrorContextAsync(errorId);
            if (message != null)
            {
                vm.Error = message;

                if (!_environment.IsDevelopment())
                {
                    // only show in development
                    message.ErrorDescription = null;
                }
            }

            return View("Error", vm);
        }

        [Authorize]
        //[Authorize(Roles = "DDE.Admin")]
        public async Task<IActionResult> Secure()
        {
            await Task.Yield();

            return View();
        }

        //[Authorize(Roles = "DDE.Admin")]
        [Authorize]
        public async Task<IActionResult> CallApi()
        {
            var mockClient = await _mockHttpClient.GetCientWithToken(HttpContext);
            var response = await mockClient.GetStringAsync("/api/values");

            ViewBag.Json = JArray.Parse(response).ToString();

            return View();
        }
    }
}
