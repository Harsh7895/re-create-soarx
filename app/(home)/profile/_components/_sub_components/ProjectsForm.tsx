import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import { useTransition } from 'react'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { projectsSchema, projectsSchemaProps } from '@/schema/projects'
import { createUserProject, updateUserProject } from '@/actions/projects'

interface Props{
    handleShowForm: () => void,
    projectid?: string,
    userId: string,
    ProjectName?: string,
    ProjectLink?: string,
    SummaryOfProject?: string,
    SkillsUsed?: string[],
}

function ProjectsForm({
  handleShowForm,
  projectid = "",
  userId,
  ProjectName = "",
  ProjectLink = "",
  SummaryOfProject = "",
  SkillsUsed = []

} : Props) {
    const [isPending, startTransition] = useTransition();

    const [TechnicalSkillsTag, setTechnicalSkillsTags] = useState<string[]>(SkillsUsed);
    const [TechnicalSkill, setTechnicalSkill] = useState<string>('');

    const handleAddTechnicalTag = (event : any) => {
        event.preventDefault();
        if (TechnicalSkill.trim()) {
          setTechnicalSkillsTags([...TechnicalSkillsTag, TechnicalSkill.trim()]);
          setTechnicalSkill('');
        }
      };

      const handleInputTechnicalChange = (event : any) => {
        setTechnicalSkill(event.target.value);
      };

      const handleRemoveTechnicalTag = (indexToRemove : number) => {
        setTechnicalSkillsTags(TechnicalSkillsTag.filter((_, index) => index !== indexToRemove));
      };

      const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(projectsSchema),
        defaultValues : {
          userId : userId,
          ProjectName : ProjectName || "",
          ProjectLink: ProjectLink || "",
          SummaryOfProject: SummaryOfProject || "",
          SkillsUsed: SkillsUsed || []
        }
      });

      const onSubmit = (data: projectsSchemaProps) => {
       if(TechnicalSkillsTag.length === 0){
            return toast.error('Please add atleast one skill');
        }

        
        if(projectid){
            
            startTransition(() => {
              const formattedData = {
                ...data,
                SkillsUsed: TechnicalSkillsTag
              }
              updateUserProject(projectid, formattedData)
              .then(() => {
                toast.success('Project Updated Successfully')
                handleShowForm()
              })
              .catch((error) => {
                toast.error('Failed to update project')
              })
            })
        }else{
            startTransition(() => {
              const formattedData = {
                ...data,
                SkillsUsed: TechnicalSkillsTag
              }
              createUserProject(formattedData)
              .then(() => {
                toast.success('Project Created Successfully')
                handleShowForm()
              })
              .catch((error) => {
                toast.error('Failed to create project')
              })
            })
        }
    }

  return (
    <div className='z-[200] fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 overflow-auto'>
        <div className=" max-h-[80vh] fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/4 max-w-[640px] w-full shadow bg-white z-[200] overflow-y-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between items-center py-4 px-6 border-b-2 border-[#D9D9D9]">
            <h1 className="text-[30px] font-semibold">Projects</h1>
            <button className="" onClick={handleShowForm}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 19L19 1M1 1L19 19" stroke="#636363" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </button>
            </div>

            <div className="p-6 space-y-6">
          <div>
            <label className="">
             Project Name <span className="text-red-400">*</span>
              <input
                {...register('ProjectName')}
                type="text"
                className="border border-[#837E7E] p-4 rounded-lg mt-2 w-full"
                placeholder="Ex:BlockChain Voting System"
              />
            </label>
          </div>
          <div>
            <label  className="">
              Project Link <span className="text-red-400">*</span>
              <input
                {...register('ProjectLink')}
                type="text"
                className="border border-[#837E7E] p-4 rounded-lg mt-2 w-full"
                placeholder="Enter here..."
              />
            </label>
          </div>
          <div>
            <label  className="">
              Short summary of the project <span className="text-red-400">*</span>
              <textarea
                {...register('SummaryOfProject')}
                className="border border-[#837E7E] p-4 rounded-lg mt-2 h-[150px] w-full"
                
              />
            </label>
          </div>
          <div className=''>
                <h3 className='text-[20px] font-semibold my-4'>Skills used <span className='text-red-400'>*</span> </h3>
                <div className='flex space-x-6 '  >
                <input type="text" className='border-2 border-gray-400 py-3 px-4' value={TechnicalSkill} placeholder='Ex:HTML, CSS , JavaScript, Nextjs' onChange={handleInputTechnicalChange} />
                <button className='font-semibold border-2 border-[#A12DFF]  shadow-lg  rounded-2xl px-10 hover:bg-gray-100' onClick={handleAddTechnicalTag}>Add</button>
                </div>
                <div className='flex flex-wrap gap-2 mb-8 mt-4 '>
                    {TechnicalSkillsTag.map((tag, index) => (
                    <div
                        key={index}
                        className='flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-full'
                    >
                        <span>{tag}</span>
                        <button onClick={() => handleRemoveTechnicalTag(index)}>
                        <span className='ml-2 text-white font-bold cursor-pointer'>&times;</span>
                        </button>
                    </div>
                    ))}
                </div>
            </div>
          
        </div>
        <div className="text-right px-6 py-4 bg-[#E3DDDD]">
          <button className="signInbut min-w-[90px] font-semibold mx-auto" type='submit'>Save</button>
        </div>
        </form>
        </div>
   </div>
  )
}

export default ProjectsForm