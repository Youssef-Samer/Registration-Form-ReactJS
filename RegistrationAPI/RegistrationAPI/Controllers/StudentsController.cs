using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using RegistrationAPI.Data;
using RegistrationAPI.Models;
using RegistrationAPI.Models.DTOs;
using RegistrationAPI.Services;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace RegistrationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {

        private readonly ILogger<StudentsController> _logger;
        private readonly IStudentService _studentRepository;


        public StudentsController(ILogger<StudentsController> logger, IStudentService studentRepository)
        {
            _logger = logger;
            _studentRepository = studentRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<StudentDTO>> GetStudents()
        {
            return await _studentRepository.getStudents();
        }

        [HttpPost]
        public async Task<ActionResult<StudentDTO>> CreateStudent(StudentDTO student)
        {  

            return await _studentRepository.createStudent(student); 
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<StudentDTO>> UpdateStudent(int id, StudentDTO student)
        {
            return await _studentRepository.updateStudent(id, student);

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<StudentDTO>> DeleteStudent(int id)
        {
            return await _studentRepository.deleteStudent(id);

        }


    }
}
