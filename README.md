
# snake-game
<p align="center">
  <a href="#">
    <img src="https://raw.githubusercontent.com/FernandoFFraga/snake-game/main/assets/snake-banner.png" alt="Snake-Game" />
  </a>
</p>

# Objetivo
O jogo foi desenvolvido com o objetivo puro de diversão e exercício das tecnologias em questão.

# Detalhes de Implementação
Acho importante ressaltar alguns pontos interessantes que me deparei ao longo do breve desenvolvimento do jogo:

* Em relação a renderização do jogo em si, em primeiro momento eu a fiz utilizando uma tabela HTML onde cada um dos pixels era um TD com um id que seguia a seguinte lógica: pixel-[X]-[Y]. Formando assim um plano cartesiano. Logo após decidi implementar a utilização da tag < canva >, assim trabalhando toda a renderização direto no JS.
* Em relação a organização das funções em JS, mesmo que tendo um objetivo final bem simples, construí cada função com uma responsabilidade clara, facilitando assim qualquer refatoração de código ou qualquer processo de debug.
* Todos os pixels que compõe a cobra, são armazenados em um array, que por sua vez torna a cobra um objeto. E com isso a implementação do cenário infinito fluiu de uma maneira muito natural.