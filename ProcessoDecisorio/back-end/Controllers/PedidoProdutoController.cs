using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackEndNovo.Context;
using BackEndNovo.Model;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [Route("api/[controller]")]
    public class PedidoProdutoController : Controller
    {
        private readonly Contexto _produtoContext;

        public PedidoProdutoController(Contexto produtoContext)
        {
            _produtoContext = produtoContext;

        }
        // GET: api/values
        [HttpGet]
        [EnableCors("AllowCORS")]
        public List<PedidoProduto> Get()
        {
            return _produtoContext.PedidoProduto
                                  .Include(p => p.produto)
                                  .Select(p => new PedidoProduto { produto = p.produto})
                                  .ToList();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
