/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./login.html", // Se você tiver uma cópia na raiz também
    "./index.html",
    "./src/pages/login.html", // Adicionando explicitamente
    "./src/**/*.{js,ts,jsx,tsx,html}", // Se você organizar arquivos em uma pasta src
    "./js/**/*.js", // Incluindo seus arquivos JS atuais
    "./components/**/*.js", // Seus componentes
    "./controllers/**/*.js", // Seus controllers
    // Adicione quaisquer outros caminhos onde você usará classes Tailwind
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#4e0d0d',
        'highlight-color': '#d4af37',
      },
      fontFamily: {
        base: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      }
    },
  },
  plugins: [],
}