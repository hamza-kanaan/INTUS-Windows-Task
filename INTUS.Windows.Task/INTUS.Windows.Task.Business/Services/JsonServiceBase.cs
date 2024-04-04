using INTUS.Windows.Task.Business.Services.Interfaces;
using Newtonsoft.Json;
using System.Reflection;

namespace INTUS.Windows.Task.Business.Services
{
    public class JsonServiceBase<T> : IJsonServiceBase<T>
    {
        public JsonServiceBase()
        {
        }

        public async Task<T?> ReadAsync()
        {
            using (StreamReader r = new StreamReader(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location) + "\\Jsons\\" + typeof(T).Name.ToLower() + ".json"))
            {
                string json = await r.ReadToEndAsync();
                T entity = JsonConvert.DeserializeObject<T>(json);
                return entity;
            }
        }

        public void Update(T entity)
        {
            string json = JsonConvert.SerializeObject(entity);
            File.WriteAllText(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location) + "\\Jsons\\" + typeof(T).Name.ToLower() + ".json", json);
        }
    }
}