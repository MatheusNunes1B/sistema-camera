# Pânico de Dados

MVP educacional de uma catraca escolar virtual que utiliza a webcam e reconhecimento facial no navegador para simular o controle de entrada.

## Funcionalidades

- Cadastro, listagem e exclusão de alunos.
- Captura de descriptor facial e foto de cadastro por webcam.
- Identificação facial local de uma pessoa por vez.
- Respostas de acesso autorizado, negado e alerta para múltiplos rostos.
- Catraca visual com animação de abertura.
- Dashboard com alunos cadastrados, acessos do dia, autorizações e negações.
- Histórico salvo no navegador e sincronizado com o Supabase quando configurado.
- Controles independentes para ativar e desligar a câmera na catraca e no cadastro.

## Tecnologias

- HTML e JavaScript puro
- Tailwind CSS via CDN
- `navigator.mediaDevices.getUserMedia()`
- `localStorage`
- `@vladmandic/face-api` via CDN
- Supabase Storage e REST API

## Como executar

O projeto precisa ser aberto por um servidor local seguro (`localhost` ou HTTPS), porque navegadores bloqueiam a webcam em arquivos abertos com `file://`.

Uma opção é abrir a pasta no VS Code e usar a extensão **Live Server**. Outra é executar:

```bash
npx serve .
```

Abra o endereço informado, permita o uso da câmera quando solicitado e mantenha conexão com a internet na primeira carga dos modelos faciais.

## Como usar

1. Abra **Alunos** e clique em **+ CADASTRAR ALUNO**.
2. Preencha nome, matrícula e turma.
3. Clique em **ATIVAR CÂMERA**, posicione somente uma pessoa no enquadramento e escolha **CAPTURAR ROSTO**.
4. Clique em **SALVAR ALUNO**.
5. Na tela **Catraca**, clique em **ATIVAR CÂMERA** e apresente o rosto cadastrado.
6. Consulte os eventos em **Histórico**.

Use iluminação uniforme e deixe apenas uma pessoa diante da câmera para melhorar a demonstração. A câmera pode ser desligada por seu botão correspondente; ela também é encerrada ao fechar o cadastro ou sair da página.

## Supabase

Abra o **SQL Editor** do seu projeto Supabase e execute [supabase/setup-storage.sql](supabase/setup-storage.sql). O script cria:

- o bucket público `student-photos`, usado para as fotos de cadastro;
- a tabela `access_logs`, usada para o histórico de acessos;
- as políticas necessárias para o protótipo funcionar com a chave `anon` no navegador.

Cada acesso autorizado ou negado é salvo no `localStorage` e enviado para `access_logs`. Ao abrir a aplicação, os últimos 100 registros remotos são carregados. Ao limpar o histórico, a aplicação tenta apagar tanto os registros locais quanto os remotos.

Se o Supabase não estiver configurado ou estiver sem conexão, a demonstração continua usando somente o armazenamento local. As fotos são enviadas ao bucket quando ele está disponível; caso contrário, ficam armazenadas apenas no navegador.

> As políticas fornecidas permitem leitura, inserção e remoção para a chave pública do projeto exclusivamente para demonstração. Em produção, use autenticação, políticas por usuário/escola e regras de retenção de dados.

## Estrutura

```text
index.html                 Interface e layout Tailwind
js/storage.js              Persistência local
js/camera.js               Webcam e tratamento de permissões
js/faceRecognition.js      Modelos, detecção e comparação facial
js/supabase.js             Upload de foto e histórico remoto
js/app.js                  Interface, cadastro, catraca e histórico
supabase/setup-storage.sql Bucket, tabela e políticas do Supabase
```

## Limitações e privacidade

O reconhecimento varia conforme iluminação, câmera, ângulo e enquadramento. Os modelos faciais são baixados de um CDN na primeira utilização. O vídeo da webcam é processado localmente; o aplicativo não envia vídeo contínuo ao servidor. As fotos de cadastro e os registros só são enviados ao Supabase se a configuração descrita acima for executada.

Dados biométricos exigem proteção especial. Use informações fictícias em apresentações e não publique fotos, descriptors ou históricos reais em repositórios.

## Aviso

Este projeto é um MVP/protótipo educacional.

Não deve ser utilizado como sistema real de controle de acesso sem validações adicionais de segurança, privacidade, precisão do reconhecimento facial, tratamento de dados biométricos e conformidade legal.
