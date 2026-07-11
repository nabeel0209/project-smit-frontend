import api from "./axios";

export type CourseLevel = "beginner" | "intermediate" | "advanced";
export type CourseStatus = "draft" | "published";

export interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  thumbnail?: string;
  category: string;
  level: CourseLevel;
  price: number;
  creator: string;
  status: CourseStatus;
  requirements: string[];
  learningOutcomes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateCoursePayload {
  title: string;
  description: string;
  shortDescription?: string;
  thumbnail?: string;
  category: string;
  level: CourseLevel;
  price: number;
  requirements?: string[];
  learningOutcomes?: string[];
}

export interface UpdateCoursePayload extends Partial<CreateCoursePayload> {
  status?: CourseStatus;
}

export const createCourse = async (
  payload: CreateCoursePayload,
): Promise<Course> => {
  const res = await api.post("/courses", payload);
  return res.data.course;
};

export const getMyCourses = async (): Promise<Course[]> => {
  const res = await api.get("/courses/creator/my-courses");
  return res.data.courses;
};

export const getPublishedCourses = async (): Promise<Course[]> => {
  const res = await api.get("/courses");
  return res.data.courses;
};

export const getCourseById = async (id: string): Promise<Course> => {
  const res = await api.get(`/courses/${id}`);
  return res.data.course;
};

export const updateCourse = async (
  id: string,
  payload: UpdateCoursePayload,
): Promise<Course> => {
  const res = await api.patch(`/courses/${id}`, payload);
  return res.data.course;
};

export const publishCourse = async (id: string): Promise<Course> => {
  const res = await api.patch(`/courses/${id}/publish`);
  return res.data.course;
};

export const deleteCourse = async (id: string): Promise<void> => {
  await api.delete(`/courses/${id}`);
};
