describe('simulando Mouse Hover', () => {


    //para esse teste foi instalado o cypress-real-events, para simular o mouse hover, pois o cypress nativo não tem suporte a isso
    //dentro da pasta support/commands.js foi importado o cypress-real-events, e dentro do teste foi utilizado o comando realHover() para simular o mouse hover, e assim validar se o texto aparece ao passar o mouse em cima do link
    it('Deve mostrar o texto ao passar o mouse em cima do link', () => {
        cy.login()
        cy.contains('Isso é Mouseover!')
            .should('not.exist')

        cy.get('[data-cy="instagram-link"]').realHover()
        cy.contains('Isso é Mouseover!')
            .should('be.visible')
    })
})