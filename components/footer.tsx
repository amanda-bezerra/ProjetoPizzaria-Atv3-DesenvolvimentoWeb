'use client';

import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Layout responsivo com 1 coluna no mobile e 3 em telas maiores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Informações do restaurante */}
          <div>
            <h3 className="text-lg font-bold mb-4">Projeto Pizzaria</h3>
            <p className="text-gray-300 mb-4">Sabor e qualidade em cada pedido.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Horários de funcionamento */}
          <div>
            <h3 className="text-lg font-bold mb-4">Horário de Funcionamento</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Segunda a Sexta: 11h às 23h</li>
              <li>Sábados e Domingos: 11h às 00h</li>
              <li>Feriados: 12h às 22h</li>
            </ul>
          </div>

          {/* Informações de contato */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Telefone: (65) 99924-2422</li>
              <li>WhatsApp: (65) 99924-2422</li>
              <li>Email: contato@projetopizzaria.com.br</li>
              <li>Endereço: Av. Principal, 123 - Centro</li>
            </ul>
          </div>
        </div>

        {/* Rodapé institucional */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Projeto Pizzaria. Todos os direitos reservados.</p>
          <p className="mt-1">Desenvolvido para a disciplina de <strong>Desenvolvimento de Sistemas Web</strong></p>
          <p className="mt-1">Aluna: Amanda Bezerra</p>
          <p className="mt-1">Professor: Antônio Carlos Pereira dos Santos Jr. ("Linkon")</p>
        </div>
      </div>
    </footer>
  );
}
