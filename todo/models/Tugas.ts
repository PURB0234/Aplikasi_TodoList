export interface SubTugas {
  text: string;
  completed: boolean;
}

export interface Tugas {
  id: string;
  judulTugas: string;
  subTugas: SubTugas[];
  prioritas: boolean;
  createdAt: string;
  deadline?: string;
}
