# Pânico de Dados

> Controle de acesso escolar inteligente, criado para demonstração educacional pelo squad **Pânico de Dados**.

O **Pânico de Dados** é um MVP de catraca escolar virtual que transforma a webcam do computador em um ponto de entrada. O sistema cadastra alunos, registra uma referência facial no navegador e simula a liberação ou o bloqueio de acesso em tempo real.

Nossa proposta é apresentar, de forma clara e visual, como tecnologias web podem apoiar a gestão de entrada em ambientes escolares — sempre com foco em prototipação, privacidade e uso responsável de dados.

## O que construímos

- Cadastro de alunos com nome, matrícula, turma e captura facial.
- Identificação facial local usando a webcam do dispositivo.
- Estados de acesso claros: aguardando, identificando, autorizado, negado e alerta de múltiplas pessoas.
- Catraca virtual com animação de abertura e bloqueio.
- Painel com indicadores de alunos cadastrados, acessos do dia, autorizações e negações.
- Histórico de acessos com data, hora, aluno, turma e status.
- Persistência local para manter a demonstração disponível após recarregar a página.
- Integração opcional com Supabase para fotos de cadastro e histórico remoto.
- Interface responsiva para desktop, notebook, tablet e celular.

## Demonstração do fluxo

```text
Cadastro do aluno
      ↓
Captura de rosto pela webcam
      ↓
Descriptor facial salvo no navegador
      ↓
Pessoa se posiciona na catraca virtual
      ↓
Reconhecimento facial local
      ↓
Autorizado: catraca abre e acesso é registrado
Negado: catraca permanece bloqueada e acesso é registrado
```

## Tecnologias

| Tecnologia | Uso no projeto |
| --- | --- |
| HTML + JavaScript puro | Interface e lógica da aplicação |
| Tailwind CSS | Design responsivo e componentes visuais |
| `getUserMedia()` | Permissão e acesso à webcam |
| `@vladmandic/face-api` | Detecção e comparação facial no navegador |
| `localStorage` | Cadastro e histórico local |
| Supabase | Fotos de cadastro e histórico remoto opcional |

## Como executar

Clone o repositório e abra a pasta em um servidor local. A webcam não funciona ao abrir o arquivo diretamente com `file://`.

```bash
git clone https://github.com/MatheusNunes1B/sistema-camera.git
cd sistema-camera
npx serve .
```

Como alternativa, abra a pasta no VS Code e use a extensão **Live Server**. Depois, abra o endereço exibido pelo servidor e permita o uso da câmera quando o navegador solicitar.

## Como apresentar o MVP

1. Acesse **Alunos** e selecione **+ CADASTRAR ALUNO**.
2. Informe nome, matrícula e turma.
3. Ative a câmera, mantenha apenas uma pessoa no enquadramento e capture o rosto.
4. Salve o cadastro.
5. Abra **Catraca**, ative a câmera e posicione o aluno cadastrado.
6. Observe a autorização, a animação da catraca e o registro no histórico.
7. Teste um rosto não cadastrado para demonstrar o bloqueio de acesso.

Para melhores resultados, use um ambiente bem iluminado e mantenha o rosto centralizado na câmera.

## Arquitetura do projeto

```text
index.html                 Interface principal e navegação
js/app.js                  Fluxos de cadastro, catraca, UI e histórico
js/camera.js               Inicialização e encerramento seguro da webcam
js/faceRecognition.js      Modelos, detecção e comparação facial
js/storage.js              Persistência local no navegador
js/supabase.js             Integração opcional com Supabase
```

## Dados e integração com Supabase

Por padrão, os dados ficam no `localStorage` do navegador. Isso permite que o projeto seja demonstrado sem backend, mas os cadastros permanecem apenas no dispositivo utilizado.

Para configurar o Supabase, abra o **SQL Editor** do projeto, copie e execute [supabase/setup-storage.sql](supabase/setup-storage.sql). O script cria o bucket `student-photos`, a tabela `access_logs` e as permissões de demonstração utilizadas pela aplicação.

Quando configurado, o Supabase pode armazenar as fotos no bucket `student-photos` e os acessos na tabela `access_logs`. A aplicação continua funcionando localmente se o Supabase estiver indisponível.

> As regras atuais de Supabase foram pensadas para a demonstração. Em uma versão real, seriam indispensáveis autenticação, controle de acesso por perfil, regras de retenção e auditoria.

## Privacidade e uso responsável

Reconhecimento facial envolve dados biométricos e precisa de cuidados especiais. Neste MVP:

- a análise da webcam ocorre localmente no navegador;
- o vídeo contínuo não é enviado para um servidor pela aplicação;
- os dados locais permanecem no navegador utilizado;
- recomendamos utilizar informações e imagens fictícias em apresentações.

## Limitações conhecidas

Este é um protótipo educacional. A precisão pode variar conforme iluminação, qualidade da câmera, posição do rosto e semelhança entre pessoas. O sistema não possui mecanismos de autenticação, prova de vida, auditoria avançada ou conformidade regulatória completa.

## Aviso

Este projeto não deve ser usado como sistema real de controle de acesso sem validações adicionais de segurança, privacidade, precisão de reconhecimento facial, proteção de dados biométricos e conformidade legal.

---

Desenvolvido pelo squad **Pânico de Dados**.
