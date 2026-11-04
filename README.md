<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aplikasi Administrasi Guru Profesional - SMPN 1 Plampang</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- React & ReactDOM -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <!-- Babel untuk menerjemahkan JSX di browser -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="bg-slate-50 text-slate-900">
    <div id="root"></div>

    <script type="text/babel">
        // Salin atau sesuaikan komponen utama aplikasi Anda di sini
        function App() {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center p-4">
                    <h1 className="text-2xl font-bold text-indigo-600 mb-2">Aplikasi Administrasi Guru Profesional</h1>
                    <p className="text-slate-600">SMPN 1 Plampang</p>
                </div>
            );
        }

        ReactDOM.createRoot(document.getElementById('root')).render(<App />);
    </script>
</body>
</html>
