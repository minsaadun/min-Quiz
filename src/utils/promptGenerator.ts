import { QuizFormData } from '../types';

export function generateQuizPrompt(data: QuizFormData): string {
  const cleanSubject = data.subject.trim();
  const cleanTitle = data.title.trim();
  const cleanGrade = data.gradeLevel.trim();
  const cleanObjective = data.objective.trim();
  const cleanNotes = data.notes.trim();

  // Handle objective line
  const objectiveLine = cleanObjective
    ? `Objektif pembelajaran: ${cleanObjective}`
    : `Objektif pembelajaran: Menguji kefahaman asas topik mengikut sukatan pembelajaran.`;

  // Handle language specification
  let languageSpec: string = data.language;
  let bilingualInstruction = '';
  if (data.language === 'Dwibahasa') {
    languageSpec = 'Dwibahasa (Bahasa Melayu & Bahasa Inggeris)';
    bilingualInstruction =
      '- Format dwibahasa: Paparkan teks setiap soalan dan empat pilihan jawapan dalam Bahasa Melayu terlebih dahulu, diikuti terjemahan Bahasa Inggeris di bawahnya.\n';
  }

  // Handle notes block
  let notesBlock = '';
  if (cleanNotes) {
    notesBlock = `Bahan rujukan guru:\n${cleanNotes}\n\n`;
  }

  // Handle post-quiz options text
  const postQuizConfig: string[] = [
    '- Paparkan markah yang diperoleh, jumlah soalan dan peratus markah dengan tepat (satu markah untuk setiap jawapan yang betul).',
  ];

  if (data.showCorrectAnswers) {
    postQuizConfig.push(
      '- Paparkan senarai semakan jawapan betul bagi setiap soalan selepas penghantaran kuiz.'
    );
  } else {
    postQuizConfig.push(
      '- Jangan dedahkan atau paparkan senarai jawapan betul selepas kuiz dihantar (hanya paparkan markah dan peratus).'
    );
  }

  if (data.showExplanation) {
    postQuizConfig.push(
      '- Sertakan penerangan ringkas dan padat bagi setiap jawapan pada skrin keputusan kuiz.'
    );
  } else {
    postQuizConfig.push(
      '- Tidak perlu sertakan penerangan ringkas pada skrin keputusan.'
    );
  }

  if (data.allowRetry) {
    postQuizConfig.push(
      '- Sediakan butang ‘Cuba Lagi’ pada skrin keputusan yang mengosongkan semua pilihan jawapan serta markah untuk membolehkan pelajar mengulang kuiz dari awal.'
    );
  } else {
    postQuizConfig.push(
      '- Jangan sediakan butang ‘Cuba Lagi’ pada skrin keputusan.'
    );
  }

  const promptText = `Bina kuiz interaktif menggunakan Gemini Canvas berdasarkan maklumat berikut:
Subjek: ${cleanSubject}
Tajuk: ${cleanTitle}
Tahap pelajar: ${cleanGrade}
${objectiveLine}
Bilangan soalan: ${data.questionCount}
Tahap kesukaran: ${data.difficulty}
Bahasa: ${languageSpec}

${notesBlock}Keperluan kandungan:
- Hasilkan ${data.questionCount} soalan yang ditetapkan.
- Semua soalan berbentuk objektif dengan empat pilihan A, B, C dan D.
- Setiap soalan mempunyai satu jawapan betul yang jelas.
- Gunakan bahasa yang sesuai dengan tahap pelajar (${cleanGrade}).
- Elakkan soalan berulang, mengelirukan atau mempunyai lebih daripada satu jawapan betul.
${bilingualInstruction}- ${
    cleanNotes
      ? 'Gunakan nota yang disediakan di atas sebagai sumber rujukan utama. Jangan tambah fakta yang tidak disokong oleh nota.'
      : 'Gunakan fakta asas yang boleh disemak dan nyatakan bahawa guru perlu menyemak kandungan.'
  }
- Jangan mereka petikan al-Quran, hadis, hukum atau sumber agama. Jika soalan memerlukan rujukan khusus yang tidak dibekalkan, minta guru menyediakan rujukan tersebut.

Keperluan aplikasi kuiz:
- Bina aplikasi kuiz yang berfungsi, bukan sekadar senarai soalan.
- Paparkan tajuk dan arahan ringkas pada halaman permulaan.
- Sediakan butang ‘Mula Kuiz’.
- Paparkan satu soalan pada satu masa.
- Sediakan butang ‘Sebelumnya’ dan ‘Seterusnya’.
- Kekalkan jawapan yang dipilih apabila pelajar bergerak antara soalan.
- Paparkan kemajuan, contohnya ‘Soalan 3 daripada ${data.questionCount}’.
- Jangan dedahkan jawapan betul atau markah ketika pelajar sedang menjawab.
- Sediakan butang ‘Hantar Jawapan’ pada soalan terakhir.
- Jika ada soalan belum dijawab, halang penghantaran dan bantu pelajar kembali kepada soalan tersebut.
- Selepas semua soalan dijawab dan dihantar, kira markah dengan tepat: satu markah bagi setiap jawapan betul.
- Paparkan jumlah jawapan betul, jumlah soalan dan peratus.
- Ikut pilihan guru untuk paparan jawapan betul, penerangan dan butang ‘Cuba Lagi’:
${postQuizConfig.map((item) => '  ' + item).join('\n')}
- Tidak perlu meminta nama, kelas atau log masuk.
- Tidak perlu menyimpan markah atau menghantar data ke mana-mana pelayan.
- Tidak perlu Google Sheets, pangkalan data, leaderboard atau API.
- Gunakan reka bentuk mesra pelajar, teks jelas dan butang mudah ditekan.
- Pastikan aplikasi responsif dan semua butang berfungsi.`;

  return promptText;
}
