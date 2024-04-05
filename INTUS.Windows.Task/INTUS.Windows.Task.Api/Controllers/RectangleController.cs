using INTUS.Windows.Task.Business.Services.Interfaces;
using INTUS.Windows.Task.Model;
using INTUS.Windows.Task.Model.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;

namespace INTUS.Windows.Task.Api.Controllers
{
    /// <summary>
    /// Controller for all rectangle actions
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class RectangleController : ControllerBase
    {
        private readonly ILogger<RectangleController> _logger;
        private readonly IJsonServiceBase<Rectangle> _jsonServiceBase;
        private readonly IStringLocalizer<Resource> _localizer;

        /// <summary>
        /// Constructor of RectangleController
        /// </summary>
        public RectangleController(ILogger<RectangleController> logger, IJsonServiceBase<Rectangle> jsonServiceBase, IStringLocalizer<Resource> localizer)
        {
            _logger = logger;
            _jsonServiceBase = jsonServiceBase ??
                throw new ArgumentNullException(nameof(jsonServiceBase));
            _localizer = localizer;
        }

        /// <summary>
        /// Get the rectangle
        /// </summary>
        [HttpGet]
        [Route("Get")]
        public async Task<IActionResult> Get()
        {
            Response<Rectangle?> response = new Response<Rectangle?>();
            try
            {
                var rectangle = await _jsonServiceBase.ReadAsync();
                if (rectangle == null)
                {
                    response.Message = _localizer["RectangleController_Get_NotFound"];
                    response.Code = StatusCodes.Status404NotFound;
                    return NotFound(response);
                }
                else
                {
                    response.Result = rectangle;
                    response.Message = _localizer["RectangleController_Get_Success"];
                    response.Code = StatusCodes.Status200OK;
                    return Ok(response);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(null, ex);
                response.Message = _localizer["RectangleController_Get_Error"];
                response.Code = StatusCodes.Status500InternalServerError;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }


        /// <summary>
        /// Update the rectangle
        /// </summary>
        [HttpPut]
        [Route("Update")]
        public IActionResult Update(Rectangle rectangle)
        {
            Response<object> response = new Response<object>();
            try
            {
                var rectangleOld = _jsonServiceBase.ReadAsync().Result;
                if (rectangle == null)
                {
                    response.Message = _localizer["RectangleController_Update_NotFound"];
                    response.Code = StatusCodes.Status404NotFound;
                    return NotFound(response);
                }
                else
                {
                    _jsonServiceBase.Update(rectangle);
                    response.Message = _localizer["RectangleController_Update_Success"];
                    response.Code = StatusCodes.Status200OK;
                    return Ok(response);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(null, ex);
                response.Message = _localizer["RectangleController_Update_Error"];
                response.Code = StatusCodes.Status500InternalServerError;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }
    }
}