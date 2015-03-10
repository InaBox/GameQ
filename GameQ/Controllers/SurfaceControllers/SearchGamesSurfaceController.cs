using GameQ.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using Umbraco.Web.Mvc;

namespace GameQ.Controllers
{
    public class SearchGamesSurfaceController : SurfaceController
    {
        public ActionResult SearchGames()
        {

            List<Game> games = new List<Game>();

            string url = "http://www.boardgamegeek.com/xmlapi/search?search=Crossbows%20and%20Catapults";
            XmlDocument xDoc = new XmlDocument();
            xDoc.Load(url); 

            return PartialView("test");
        }
    }
}