// app/contato/page.tsx
'use client'

import { useState } from "react";
import Link from "next/link";
import { Loader2, Send, CheckCircle2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_CLOUD_API_URL || 'http://localhost:3000';

export default function ContatoPage() {
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  async function handleAction(formData: FormData) {
    setLoading(true);

    // 1. Captura o que o utilizador escreveu no campo 'message' e 'email'
    const mensagemOriginal = formData.get('message') as string;
    const emailVisitante = formData.get('email') as string;
    const nome = formData.get('nome') as string;
    const telefone = formData.get('telefone') as string;

    // 2. Prepara o texto para o campo 'pedido_oracao'
    const textoFormatado = `\u2709\uFE0F [CONTACTO SITE]\nE-mail: ${emailVisitante}\n\n${mensagemOriginal}`;

    try {
      const res = await fetch(API_URL + '/api/public/visitante', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          telefone,
          pedido_oracao: textoFormatado,
        }),
      });

      const data = await res.json();

      if (data.ok) {
        setSucesso(true);
      } else {
        alert(data.error || "Ocorreu um erro ao enviar. Tente novamente.");
      }
    } catch (error) {
      alert("Ocorreu um erro ao enviar. Tente novamente.");
    }

    setLoading(false);
  }

  return (
    <main className="space-y-16 animate-in fade-in duration-700">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-[2.5rem] border border-soft bg-bg2 p-8 md:p-12 shadow-sm">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "rgba(63,107,79,0.35)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "rgba(127,174,147,0.18)" }}
        />

        <div className="relative z-10 max-w-3xl space-y-4">
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-fg leading-none">
            Fale <span className="text-figueira">Connosco</span>
          </h1>

          <p className="text-muted text-base md:text-lg font-medium max-w-xl">
            Estamos a disposicao para orar consigo, esclarecer duvidas ou orientar a sua primeira
            visita a nossa igreja.
          </p>

          <div className="flex flex-wrap gap-3 pt-4">
            <Link href="/congregacoes" className="bg-figueira text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-figueira/20 active:scale-95">
              Ver congregacoes
            </Link>
            <Link href="/agenda" className="bg-bg border border-soft text-fg px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-soft transition-all active:scale-95">
              Ver agenda
            </Link>
          </div>
        </div>
      </section>

      {/* CONTEUDO */}
      <section className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">

        {/* FORMULARIO (Ocupa 3 colunas) */}
        <div className="lg:col-span-3 rounded-[2.5rem] border border-soft bg-bg2 p-8 shadow-sm">

          {sucesso ? (
            /* ESTADO DE SUCESSO (Substitui o formulario) */
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-10 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-[1.5rem] flex items-center justify-center mx-auto mb-2 shadow-lg shadow-green-500/20">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-3xl font-black italic uppercase tracking-tighter text-fg leading-none">
                Mensagem <span className="text-green-500">Enviada!</span>
              </h2>
              <p className="text-xs font-bold text-muted uppercase tracking-widest max-w-xs mx-auto">
                A nossa equipa de acolhimento recebeu o teu contacto e respondera muito em breve.
              </p>
              <button onClick={() => setSucesso(false)} className="mt-4 text-[9px] font-black uppercase tracking-widest text-figueira border border-figueira/20 bg-figueira/5 px-6 py-3 rounded-xl hover:bg-figueira/10 transition-all">
                Enviar nova mensagem
              </button>
            </div>
          ) : (
            /* O FORMULARIO LIGADO AO ACOLHIMENTO */
            <>
              <h2 className="text-2xl font-black italic uppercase tracking-tighter text-fg mb-6">Envie uma mensagem</h2>

              <form action={handleAction} className="space-y-5">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase text-muted tracking-widest ml-4">Nome Completo</label>
                    <input
                      type="text"
                      name="nome"
                      required
                      className="w-full bg-bg border border-soft rounded-2xl p-4 text-sm font-bold text-fg focus:border-figueira outline-none shadow-sm transition-all"
                      placeholder="O teu nome..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase text-muted tracking-widest ml-4">Telemovel (Opcional)</label>
                    <input
                      type="tel"
                      name="telefone"
                      className="w-full bg-bg border border-soft rounded-2xl p-4 text-sm font-bold text-fg focus:border-figueira outline-none shadow-sm transition-all"
                      placeholder="O teu numero..."
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase text-muted tracking-widest ml-4">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-bg border border-soft rounded-2xl p-4 text-sm font-bold text-fg focus:border-figueira outline-none shadow-sm transition-all"
                    placeholder="seuemail@exemplo.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase text-muted tracking-widest ml-4">Mensagem</label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="w-full bg-bg border border-soft rounded-2xl p-4 text-sm font-bold text-fg focus:border-figueira outline-none shadow-sm transition-all resize-none custom-scrollbar"
                    placeholder="Escreve aqui a tua duvida, pedido de oracao ou mensagem..."
                  />
                </div>

                <button disabled={loading} type="submit" className="w-full flex items-center justify-center gap-2 bg-figueira text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-xl shadow-figueira/20 active:scale-95 disabled:opacity-50 mt-2">
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  {loading ? 'A enviar...' : 'Enviar Mensagem'}
                </button>

                <p className="text-[9px] font-bold text-muted uppercase tracking-widest text-center pt-2">
                  Ao enviar, concordas em ser contactado pela nossa equipa de acolhimento.
                </p>
              </form>
            </>
          )}
        </div>

        {/* INFORMACOES (Ocupa 2 colunas) */}
        <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
          <div className="rounded-[2.5rem] border border-soft bg-bg2 p-8 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-figueira mb-1">E-mail Direto</h3>
            <p className="text-sm font-bold text-fg">admvcff@gmail.com</p>
          </div>

          <div className="rounded-[2.5rem] border border-soft bg-bg2 p-8 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-figueira mb-1">A Nossa Sede</h3>
            <p className="text-sm font-bold text-fg leading-relaxed">
              R. Antonio Pestana Rato 77
              <br />
              <span className="text-muted">3080-014 Figueira da Foz</span>
            </p>

            <div className="pt-4 mt-4 border-t border-soft">
              <a
                href="https://www.google.com/maps/place/Igreja+Evang%C3%A9lica+Assembleia+de+Deus+Minist%C3%A9rio+Vis%C3%A3o+de+Conquista+-+ADMVC/@40.1556145,-8.8431124,17z/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-black uppercase tracking-widest text-figueira hover:text-fg transition-colors flex items-center gap-2"
              >
                Abrir no Google Maps &rarr;
              </a>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-soft bg-bg2 p-8 shadow-sm flex-1">
            <h3 className="text-lg font-black italic uppercase tracking-tighter text-fg mb-2">Primeira visita?</h3>
            <p className="text-xs font-medium text-muted leading-relaxed mb-6">
              Se quiser, fale connosco antes e ajudamos a orientar o melhor dia e horario para a
              sua visita.
            </p>

            <div className="flex flex-col gap-3">
              <Link href="/agenda" className="bg-bg border border-soft text-center text-fg px-6 py-3.5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-soft transition-all active:scale-95">
                Ver horarios
              </Link>
              <Link href="/congregacoes" className="bg-bg border border-soft text-center text-fg px-6 py-3.5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-soft transition-all active:scale-95">
                Descobrir moradas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
