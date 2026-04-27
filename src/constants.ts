/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  xp: number;
  category: 'AI' | 'Coding' | 'Tech';
}

export const QUESTION_POOL: Question[] = [
  {
    id: 1,
    category: 'Coding',
    question: "Apa fungsi dari perintah 'mkdir' di terminal/command line?",
    options: ["Menghapus folder", "Membuat folder baru", "Memindahkan file", "Membaca isi file"],
    correctIndex: 1,
    xp: 200
  },
  {
    id: 2,
    category: 'AI',
    question: "Apa kepanjangan dari AI?",
    options: ["Automated Internet", "Artificial Intelligence", "Advanced Integration", "Array Interface"],
    correctIndex: 1,
    xp: 150
  },
  {
    id: 3,
    category: 'Coding',
    question: "Manakah yang merupakan elemen 'Self-closing' dalam HTML?",
    options: ["<div>", "<span>", "<img>", "<p>"],
    correctIndex: 2,
    xp: 200
  },
  {
    id: 4,
    category: 'AI',
    question: "Siapa yang sering dianggap sebagai 'Bapak Ilmu Komputer' dan pelopor AI?",
    options: ["Elon Musk", "Alan Turing", "Bill Gates", "Mark Zuckerberg"],
    correctIndex: 1,
    xp: 300
  },
  {
    id: 5,
    category: 'Tech',
    question: "Apa singkatan dari URL?",
    options: ["Uniform Resource Locator", "Universal Radio Link", "User Response Layer", "Unit Resource List"],
    correctIndex: 0,
    xp: 150
  },
  {
    id: 6,
    category: 'Coding',
    question: "Bahasa pemrograman mana yang berjalan di sisi browser (Client-side)?",
    options: ["Python", "PHP", "JavaScript", "SQL"],
    correctIndex: 2,
    xp: 250
  },
  {
    id: 7,
    category: 'AI',
    question: "Apa yang dimaksud dengan 'Machine Learning'?",
    options: ["Mesin yang mencuci otomatis", "Kemampuan komputer belajar dari data tanpa diprogram eksplisit", "Proses merakit komputer", "Kecepatan prosesor"],
    correctIndex: 1,
    xp: 350
  },
  {
    id: 8,
    category: 'Tech',
    question: "Komponen mana yang disebut sebagai 'Otak' dari komputer?",
    options: ["RAM", "SSD", "CPU", "GPU"],
    correctIndex: 2,
    xp: 200
  },
  {
    id: 9,
    category: 'Coding',
    question: "Dalam JavaScript, 'const' digunakan untuk...",
    options: ["Variabel yang nilainya bisa berubah", "Variabel yang nilainya tetap (constant)", "Fungsi matematika", "Looping"],
    correctIndex: 1,
    xp: 200
  },
  {
    id: 10,
    category: 'AI',
    question: "Manakah dari berikut ini yang merupakan contoh asisten AI?",
    options: ["Siri", "Photoshop", "Notepad", "Excel"],
    correctIndex: 0,
    xp: 150
  },
  {
    id: 11,
    category: 'Coding',
    question: "Apa simbol untuk operator 'And' (Dan) dalam banyak bahasa pemrograman?",
    options: ["||", "==", "&&", "++"],
    correctIndex: 2,
    xp: 250
  },
  {
    id: 12,
    category: 'Tech',
    question: "Apa itu 'Cloud Computing'?",
    options: ["Menyimpan data di awan cuaca", "Layanan komputasi melalui internet", "Komputer bertenaga uap", "Kabel bawah laut"],
    correctIndex: 1,
    xp: 300
  },
  {
    id: 13,
    category: 'AI',
    question: "Istilah 'Deep Learning' berkaitan erat dengan struktur...",
    options: ["Jaringan Saraf Tiruan (Neural Networks)", "Database SQL", "File System", "Router Wi-Fi"],
    correctIndex: 0,
    xp: 400
  },
  {
    id: 14,
    category: 'Coding',
    question: "Tag HTML mana yang digunakan untuk membuat link?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    correctIndex: 1,
    xp: 150
  },
  {
    id: 15,
    category: 'Tech',
    question: "Satu Terabyte (TB) setara dengan berapa Gigabyte (GB)?",
    options: ["100 GB", "500 GB", "1000 GB", "1024 GB"],
    correctIndex: 3,
    xp: 250
  }
];
