namespace INTUS.Windows.Task.Model
{
    public class Response<T>
    {
        public string? Message { get; set; }
        public int Code { get; set; }
        public T? Result { get; set; }
    }
}