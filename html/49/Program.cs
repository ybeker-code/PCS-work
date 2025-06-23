namespace c_Assessment
{
    internal class Program
    {
        static void Main(string[] args)
        {
            GetCloset();
        }
        public static void GetCloset()
        {
            List<Shirt> closet = new List<Shirt>();
            string[] colors = { "red", "blue", "green" };
            string[] patterns = { "striped", "checked", "plain" };
            for (int i = 0; i < colors.Length; i++)
            {
                for (int j = 0; j < patterns.Length; j++)
                {
                    closet.Add(new Shirt(colors[i], patterns[j]));
                }
            }
            Print(closet);
        }
        static void Print(List<Shirt> closet)
        {
            foreach (var item in closet)
            {
                Console.WriteLine(item);
            }
        }
    }
}
