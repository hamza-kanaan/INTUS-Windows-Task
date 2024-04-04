using INTUS.Windows.Task.Business.Services.Interfaces;
using INTUS.Windows.Task.Model;
using INTUS.Windows.Task.Model.Models;
using Microsoft.AspNetCore.Mvc;

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

        /// <summary>
        /// Constructor of RectangleController
        /// </summary>
        public RectangleController(ILogger<RectangleController> logger, IJsonServiceBase<Rectangle> jsonServiceBase)
        {
            _logger = logger;
            _jsonServiceBase = jsonServiceBase ??
                throw new ArgumentNullException(nameof(jsonServiceBase));
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
                    response.Code = StatusCodes.Status404NotFound;
                    return NotFound(response);
                }
                else
                {
                    response.Result = rectangle;
                    response.Code = StatusCodes.Status200OK;
                    return Ok(response);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("RectangleController/Get - Error", ex);
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
                _jsonServiceBase.Update(rectangle);
                response.Code = StatusCodes.Status200OK;
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError("RectangleController/Update - Error", ex);
                response.Code = StatusCodes.Status500InternalServerError;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }
    }
}