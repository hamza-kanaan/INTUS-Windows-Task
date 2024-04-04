namespace INTUS.Windows.Task.Business.Services.Interfaces
{
    public interface IJsonServiceBase<T>
    {
        Task<T?> ReadAsync();
        void Update(T entity);
    }
}