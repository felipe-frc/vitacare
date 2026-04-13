# VitaCare - Portal de Saúde Digital

Bem-vindo ao **VitaCare**, uma plataforma completa de gestão de saúde que oferece soluções para beneficiários e corretores de seguros.

## 📋 Estrutura do Projeto

### Arquivos Principais

#### Para Beneficiários (Usuários)
- **vitacare_dashboard_usuario.html** - Dashboard principal do beneficiário com seções de:
  - Início: Visualização do plano ativo e próximas consultas
  - Consultas: Agendamento e gerenciamento de consultas
  - Pagamentos: Histórico de pagamentos pendentes e realizados
  - Rede Médica: Hospitais e parceiros credenciados
  - Avaliações: Avaliações de médicos e serviços

- **vitacare_consultas_disponibilidade.html** - Página para agendar consultas com:
  - Filtros por especialidade, data e período
  - Lista de médicos disponíveis com horários
  - Sistema de seleção de horários
  - Informações detalhadas de cada médico

- **vitacare_detalhes_plano.html** - Página com detalhes completos do plano incluindo:
  - Informações do plano ativo
  - Diferenciais e cobertura incluída
  - Especialidades cobertas
  - Períodos de carência
  - Rede credenciada

#### Para Corretores
- **vitacare_dashboard_corretor.html** - Dashboard do corretor com:
  - Dashboard: Vendas recentes e estatísticas
  - Gerenciar Propostas: Visualização de todas as propostas
  - Cadastrar Plano: Formulário para criar novas propostas
  - Acompanhar: Rastreamento de propostas enviadas
  - Sistema de notificações Toast para feedback
  - Armazenamento de propostas em localStorage

#### Páginas Compartilhadas
- **index.html** - Página de login principal
- **vitacare_new_home.html** - Home page com informações gerais
- **vitacare_planos.html** - Comparação de planos disponíveis
- **vitacare_inscricao_detalhada.html** - Checkout e inscrição
- **vitacare_cadastro_usuario.html** - Cadastro de beneficiários
- **vitacare_cadastro_corretor.html** - Cadastro de corretores
- **vitacare_login_corretor.html** - Login para corretores

#### Arquivos de Suporte
- **navbar.js** - Script de navegação compartilhado
- **db_propostas.json** - Banco de dados de propostas (exemplo)

## 🎨 Design e Estética

O projeto mantém uma identidade visual profissional e consistente:

- **Cores Principais:**
  - Vermelho Vibrante (#d84d5d) - Cor primária
  - Azul Primário (#27586a) - Cor secundária
  - Branco (#ffffff) - Fundo
  - Cinza claro (#f1f5f9) - Backgrounds secundários

- **Tipografia:**
  - Font: Plus Jakarta Sans (Google Fonts)
  - Pesos: 400, 500, 600, 700, 800

- **Componentes:**
  - Cards com sombras suaves
  - Botões com transições suaves
  - Notificações Toast para feedback
  - Tabelas responsivas
  - Grids adaptáveis

## ✨ Novas Funcionalidades Implementadas

### Dashboard do Usuário

#### 1. Seção de Consultas Expandida
- Nova página dedicada para agendamento de consultas
- Filtros avançados por especialidade, data e período
- Visualização de médicos disponíveis com ratings
- Sistema de seleção de horários
- Gerenciamento de consultas agendadas e realizadas

#### 2. Seção de Pagamentos Completa
- Pagamentos pendentes com opção de pagamento imediato
- Próximos pagamentos agendados
- Histórico completo de pagamentos realizados
- Status visual de cada pagamento

#### 3. Página de Detalhes do Plano
- Informações completas do plano ativo
- Diferenciais específicos de cada plano
- Cobertura incluída com ícones
- Especialidades cobertas com tags
- Períodos de carência detalhados
- Rede credenciada com informações

### Dashboard do Corretor

#### 1. Sistema de Notificações Toast
- Notificações de sucesso ao enviar proposta
- Mensagens com feedback visual
- Animações suaves de entrada e saída
- Sem redirecionamento para página de inscrição

#### 2. Banco de Dados de Propostas
- Armazenamento em localStorage
- Persistência de dados entre sessões
- Estrutura de dados completa para propostas
- Suporte a múltiplas propostas

#### 3. Seção de Acompanhamento Aprimorada
- Visualização de todas as propostas enviadas
- Busca por ID ou CPF
- Status em tempo real de cada proposta
- Interface dividida em busca e resultados

## 🔧 Funcionalidades Técnicas

### Armazenamento de Dados
- **localStorage**: Utilizado para persistência de propostas do corretor
- **JSON**: Formato de dados estruturado

### Interatividade
- Validação de formulários
- Filtros dinâmicos
- Busca em tempo real
- Transições suaves entre seções
- Notificações visuais

### Responsividade
- Design adaptável para diferentes tamanhos de tela
- Sidebar colapsável em mobile
- Grids responsivos
- Tabelas otimizadas para mobile

## 📱 Como Usar

### Para Beneficiários

1. **Acessar o Dashboard:**
   - Faça login em `index.html`
   - Você será redirecionado para `vitacare_dashboard_usuario.html`

2. **Agendar Consulta:**
   - Clique em "Consultas" na sidebar
   - Clique em "Agendar Nova Consulta"
   - Selecione especialidade, data e horário
   - Confirme o agendamento

3. **Verificar Pagamentos:**
   - Clique em "Pagamentos" na sidebar
   - Visualize pendentes, próximos e realizados
   - Clique em "Pagar Agora" para pagamentos pendentes

4. **Ver Detalhes do Plano:**
   - Clique em "Ver Detalhes do Plano" no card do plano
   - Visualize cobertura, carências e rede credenciada

### Para Corretores

1. **Acessar o Portal:**
   - Faça login em `vitacare_login_corretor.html`
   - Você será redirecionado para `vitacare_dashboard_corretor.html`

2. **Cadastrar Nova Proposta:**
   - Clique em "Cadastrar Plano" na sidebar
   - Preencha o formulário com dados do cliente
   - Clique em "Enviar Proposta para Análise"
   - Receberá notificação de sucesso

3. **Acompanhar Propostas:**
   - Clique em "Acompanhar" na sidebar
   - Busque por ID da proposta ou CPF
   - Visualize status em tempo real

## 🎯 Melhorias Futuras

- Integração com API backend
- Autenticação real com JWT
- Banco de dados relacional
- Notificações por email
- Sistema de pagamento integrado
- Relatórios avançados
- Integração com calendário
- Chat de suporte

## 📄 Licença

Este projeto é propriedade da VitaCare. Todos os direitos reservados.

## 👥 Suporte

Para suporte técnico, entre em contato com o time de desenvolvimento VitaCare.

---

**Versão:** 2.0  
**Última Atualização:** 13 de Abril de 2026  
**Status:** Produção
