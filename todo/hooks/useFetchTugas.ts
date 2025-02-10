import { useEffect, useState } from 'react';
import { fetchTugas } from '@/controllers/taskController';
import { Tugas } from '@/models/Tugas';

export const useFetchTugas = () => {
  const [tugas, setTugas] = useState<Tugas[]>([]);
  const [filteredTugas, setFilteredTugas] = useState<Tugas[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTugas(setTugas, setLoading);
  }, []);

  const filterTugas = (text: string) => {
    const searchText = text.toLowerCase();
    const filtered = tugas.filter(
      (item) =>
        item.judulTugas.toLowerCase().includes(searchText) ||
        item.subTugas.some((sub) => sub.text.toLowerCase().includes(searchText))
    );
    setFilteredTugas(filtered);
  };

  return { tugas, filteredTugas, loading, filterTugas };
};
