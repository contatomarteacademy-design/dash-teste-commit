import * as Avatar from '@radix-ui/react-avatar';

export function Profile() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-primary-black mb-6">Perfil</h1>
      <div className="bg-white rounded-xl p-8 max-w-2xl">
        <div className="flex items-center gap-6 mb-8">
          <Avatar.Root className="w-24 h-24 rounded-full bg-primary-gray-border flex items-center justify-center overflow-hidden">
            <Avatar.Image
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas"
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <Avatar.Fallback className="w-full h-full bg-primary-gray-border flex items-center justify-center text-2xl font-semibold">
              LM
            </Avatar.Fallback>
          </Avatar.Root>
          <div>
            <h2 className="text-2xl font-bold text-primary-black mb-2">Lucas Marte</h2>
            <p className="text-primary-gray-text">lucasmarte@gmail.com</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Nome</label>
            <input
              type="text"
              defaultValue="Lucas Marte"
              className="w-full px-4 py-3 rounded-lg border border-primary-gray-border focus:outline-none focus:ring-2 focus:ring-primary-black"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              defaultValue="lucasmarte@gmail.com"
              className="w-full px-4 py-3 rounded-lg border border-primary-gray-border focus:outline-none focus:ring-2 focus:ring-primary-black"
            />
          </div>
          <button className="w-full px-6 py-3 bg-primary-black text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}



