using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace c_Assessment
{
    internal class Shirt
    {
		private string color = "white";

		public string Color
        {
			get { return color; }
			set { color = value; }
		}
		private string pattern = "plain";

		public string Pattern
        {
			get { return pattern; }
			set { pattern = value; }
		}

        public Shirt(string color, string pattern)
        {
            Color = color;
            Pattern = pattern;
        }

        public Shirt()
        {
        }

        public override string? ToString()
        {
            return $"A {Color} {Pattern} shirt";
        }
    }
}
