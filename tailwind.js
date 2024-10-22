import { create } from 'tailwind-rn';

// Definisikan styles secara manual
const styles = {
  // Contoh class Tailwind CSS yang kamu butuhkan
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#3b82f6', // Contoh warna dari Tailwind
    borderRadius: 5,
  },
  text: {
    color: '#fff',
  },
  // Tambahkan lebih banyak class sesuai kebutuhan
};

const { tailwind, getColor } = create(styles);
export { tailwind, getColor };
