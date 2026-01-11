
export interface QuizQuestion {
  pregunta: string;
  opciones: string[];
  correcta: number;
  retro: string;
}

export interface Lesson {
  id: string;
  titulo: string;
  icon: string;
  contenido: string;
  quiz: QuizQuestion[];
}

export interface Challenge {
  id: number;
  titulo: string;
  descripcion: string;
  checklist: string[];
}
