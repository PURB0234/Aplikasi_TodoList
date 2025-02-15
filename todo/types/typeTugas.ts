export interface SubTugas {
    text: string;
    completed: boolean;
  }
  
  export interface TugasData {
    judulTugas: string;
    subTugas: SubTugas[];
    userId: string;
    createdAt: Date;
  }
  