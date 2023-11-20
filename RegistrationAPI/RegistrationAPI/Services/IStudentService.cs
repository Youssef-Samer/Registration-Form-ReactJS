using RegistrationAPI.Models.DTOs;

namespace RegistrationAPI.Services
{
    public interface IStudentService
    {
        public Task<IEnumerable<StudentDTO>> getStudents();
        public Task<StudentDTO> createStudent(StudentDTO input);

        public Task<StudentDTO> updateStudent(int id, StudentDTO input);

        public Task<StudentDTO> deleteStudent(int id);

    }
}
