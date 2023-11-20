using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegistrationAPI.Data;
using RegistrationAPI.Models;
using RegistrationAPI.Models.DTOs;

namespace RegistrationAPI.Services
{
    public class StudentService : IStudentService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public StudentService(IMapper mapper, DataContext context) { _mapper = mapper; _context = context; }

        public async Task<StudentDTO> createStudent(StudentDTO input)
        {
            var NewStudent = _mapper.Map<Student>(input);
            using (_context)
            {
                await _context.Students.AddAsync(NewStudent);
                await _context.SaveChangesAsync();
            }
            input.Id = NewStudent.Id;
            return input;
        }


        public async Task<StudentDTO> deleteStudent(int id)
        {
            var Student = await _context.Students.FindAsync(id);

            if (Student == null)
            {
                throw new KeyNotFoundException();
            }

            var StudentDto = _mapper.Map<StudentDTO>(Student);
            _context.Students.Remove(Student);
            await _context.SaveChangesAsync();

            return StudentDto;
        }

        public async Task<IEnumerable<StudentDTO>> getStudents()
        {
            return _mapper.Map<IEnumerable<StudentDTO>>(await _context.Students.ToListAsync()); 
        }


        public async Task<StudentDTO> updateStudent(int id, StudentDTO input)
        {
            input.Id = id;
            var UpdatedStudent = _mapper.Map<Student>(input);

            _context.Entry(UpdatedStudent).State = EntityState.Modified;

            if (!IsStudentExists(id))
            {
                throw new KeyNotFoundException();
            }
            else
            {
                await _context.SaveChangesAsync();
                return input;
            }
           
        }

        private bool IsStudentExists(int id)
        {
            return _context.Students.Any(e => e.Id == id);
        }
    }
}
