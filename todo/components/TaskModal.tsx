import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '@/style/home_style';
import { Tugas } from '@/models/Tugas';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { db } from '@/service/firebaseConfig'
import { Firestore } from 'firebase/firestore';

interface TaskModalProps {
  isVisible: boolean;
  onClose: () => void;
  task: Tugas;
  onToggleSubTask: (subTask: any, index: number) => Promise<void>;
  onDeleteSubTask: (index: number) => Promise<void>;
  onAddSubTask: () => Promise<void>;
  onEditTask: (item: Tugas) => void;
  onDeleteTask: (id: string) => Promise<void>;
  onPrioritasChange: (item: Tugas) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isVisible,
  onClose,
  task,
  onToggleSubTask,
  onDeleteSubTask,
  onAddSubTask,
  onEditTask,
  onDeleteTask,
  onPrioritasChange,
}) => {
  const [aktif, setAktif] = useState(false);
  const [tanggal, setTanggal] = useState(new Date());
  const [waktu, setWaktu] = useState(new Date());

  const handleCloseModal = () => {
    onClose();
  };

  const handleOpenDeadline = () => {
    // Fungsi untuk membuka deadline
  };

  const handlePrioritas = (selectedTugas: Tugas) => {
    // Fungsi untuk mengubah prioritas
    onPrioritasChange(selectedTugas);
  };
  

  const handleOpenEditTugas = (selectedTugas: Tugas) => {
    // Fungsi untuk membuka edit tugas
  };

  const handleToggleSubTask = async (subTask: any, index: number) => {
    // Fungsi untuk mengubah status sub-tugas
  };

  const deleteTugas = (id: string) => {
    // Fungsi untuk menghapus tugas
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={handleCloseModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
            <Text style={styles.modalTitle}>{task.judulTugas}</Text>
            {/* Modal deadline */}
            {isVisible && (
              <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={handleCloseModal}>
                <View style={styles.modalConatinerTanggal}>
                  <View style={styles.modalContentTanggal}>
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                      <View style={{ width: '100%', height: 30, alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>Tambahkan Deadline</Text>
                      </View>
                      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', height: '50%', alignItems: 'center' }}>
                        {Platform.OS !== 'android' ? (
                          <DateTimePicker value={tanggal} mode="date" display="default" onChange={() => {}} />
                        ) : (
                          <TouchableOpacity onPress={() => {}} style={styles.buttonTime}>
                            <Ionicons name="calendar" size={21} color={'white'} />
                          </TouchableOpacity>
                        )}
                        {Platform.OS !== 'android' ? (
                          <DateTimePicker value={waktu} mode="time" display="default" onChange={() => {}} />
                        ) : (
                          <TouchableOpacity onPress={() => {}} style={styles.buttonTime}>
                            <Ionicons name="time-outline" size={21} color={'white'} />
                          </TouchableOpacity>
                        )}
                      </View>
                      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', height: '30%', alignItems: 'flex-end' }}>
                        <TouchableOpacity style={{ padding: 5 }}>
                          <Text>Batal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: 'skyblue', padding: 5, borderRadius: 20 }}>
                          <Text>Simpan</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
            )}
            <TouchableOpacity onPress={handleOpenDeadline}>
              <Ionicons name="calendar" size={21} color={'black'} />
            </TouchableOpacity>
            {/* Prioritas */}
            <TouchableOpacity
              style={{
                width: 25,
                height: 25,
                borderRadius: 12.1,
                alignItems: 'center',
                justifyContent: 'center',
                marginStart: 10,
                marginEnd: 10,
              }}
              onPress={() => handlePrioritas(task)}
            >
              {task.prioritas ? (
                <Ionicons name="star" size={21} color={'gold'} />
            ) : (
              <Ionicons name="star-outline" size={21} color={'black'} />
            )}
          </TouchableOpacity>
          {/* Edit tugas/button */}
          <TouchableOpacity
            style={{
              width: 25,
              height: 25,
              borderRadius: 12.1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => handleOpenEditTugas(task)}
          >
            <Ionicons name="pencil-sharp" color={'black'} size={21} />
          </TouchableOpacity>
        </View>
        {task.deadline && (
          <Text style={{ marginTop: 10 }}>
            Deadline: {new Date(task.deadline).toLocaleString()}
          </Text>
        )}
        <ScrollView>
          {/* <Text style={styles.modalSubTitle}>Sub-Tugas:</Text> */}
          {task.subTugas && task.subTugas.length > 0 ? (
            task.subTugas
              .filter((sub) => !sub.completed)
              .map((sub, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.subTugasItem}
                  onPress={() => handleToggleSubTask(sub, index)}
                >
                  <Ionicons
                    name={sub.completed ? 'checkbox' : 'square-outline'}
                    size={24}
                    color={sub.completed ? 'gray' : 'black'}
                    style={{ marginRight: 10 }}
                  />
                  <Text style={[
                    styles.subTugasText,
                    sub.completed && { textDecorationLine: 'line-through', color: 'gray' },
                  ]}>
                    {sub.text}
                  </Text>

                </TouchableOpacity>
              ))
          ) : (
            <Text style={styles.noResultText}>Tidak ada sub-tugas ditemukan.</Text>
          )}
        </ScrollView>
        <View style={{ marginTop: 15 }}>
          <TouchableOpacity
            style={{ width: '100%' }}
            onPress={() => setAktif(!aktif)}
          >
            <View style={{ flexDirection: 'row' }}>
              {aktif ? (
                <Ionicons name="chevron-down" color={'black'} size={25} />
              ) : (
                <Ionicons name="chevron-up" color={'black'} size={25} />
              )}
              <Text style={{ marginStart: 15, marginBottom: 20 }}>
                {task.subTugas.filter((sub) => sub.completed).length || '0'} Selesai
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {aktif && (
          <View>
            {task.subTugas
              .filter((sub) => sub.completed)
              .map((sub, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.subTugasItem}
                  // onPress={() => handleToggleSubTask(sub, index)}
                >
                  <Ionicons
                    name="checkbox"
                    size={24}
                    color={'gray'}
                    style={{ marginRight: 10, marginStart: 37.7 }}
                  />
                  <Text
                    style={[
                      styles.subTugasText,
                      { textDecorationLine: 'line-through', color: 'gray' },
                    ]}
                  >
                    {sub.text}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        )}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleCloseModal}
        >
          <Text style={styles.tutupText}>Tutup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.hapus}
          onPress={() =>
            Alert.alert(
              'Hapus',
              'Anda yakin mau menghapus tugas ini?',
              [
                { text: 'Batal', style: 'cancel' },
                { text: 'Hapus', onPress: () => deleteTugas(task.id) },
              ]
            )
          }
        >
          <Ionicons name="trash" color="#fff" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  </Modal>

  
);
};

export default TaskModal;
function setSelectedTugas(arg0: (prevTugas: any) => any) {
  throw new Error('Function not implemented.');
}

function setIsSelesai(arg0: boolean) {
  throw new Error('Function not implemented.');
}

function doc(db: Firestore, arg1: string, id: any) {
  throw new Error('Function not implemented.');
}

function updateDoc(tugasDocRef: any, arg1: { subTugas: any[]; }) {
  throw new Error('Function not implemented.');
}

