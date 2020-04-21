using NetAppDev.Common.Diagnostic;
using System;

namespace FlexForm.Api.Common
{
    /// <summary>
    /// Dummy logger, replace later with real implementation
    /// </summary>
    public class DummyLogger : ILogger
    {
        public void Error(string message, Exception exception, Guid? correlationId = null)
        {
            // intetntionally left empty
        }

        public void Info(string message, Guid? correlationId = null)
        {
            // intetntionally left empty
        }

        public void Verbose(string message, Guid? correlationId = null)
        {
            // intetntionally left empty
        }

        public void Warn(string message, Guid? correlationId = null)
        {
            // intetntionally left empty
        }
    }
}
