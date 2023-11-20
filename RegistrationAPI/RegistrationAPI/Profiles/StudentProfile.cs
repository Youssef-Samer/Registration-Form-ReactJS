using AutoMapper;
using RegistrationAPI.Models;
using RegistrationAPI.Models.DTOs;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace RegistrationAPI.Profiles
{
    public class StudentProfile : Profile
    {
        public StudentProfile()
        {
            CreateMap<StudentDTO, Student>();
            CreateMap<Student, StudentDTO>();

        }
    }
}