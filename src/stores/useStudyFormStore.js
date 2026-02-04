import { create } from 'zustand';

const initialFromDate = {
  nickname: '',
  title: '',
  description: '',
  backgroundImage: '',
  password: '',
  passwordVerify: '',
};

const useCrateStudyStore = create((set) => ({
  formData: initialFromDate,

  setField: (name, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [name]: value,
      },
    })),

  setFormData: (studyData) =>
    set(() => ({
      formData: studyData,
    })),

  resetFormData: () =>
    set(() => ({
      formData: initialFromDate,
    })),
}));

export default useCrateStudyStore;
