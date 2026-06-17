//O Cypress não tem uma função de dragDrop nativa. Para isso utiizamos o javaScript
//para implementar  DataTransfer

describe('drag and drop', () => {
    it('Deve arrastar o elemento e soltar no destino', () => {
        cy.iniciar()
        cy.submeterLogin('papito@webdojo.com', 'katana123')
        cy.contains('Kanban').click()

        const dataTransfer = new DataTransfer()

        cy.contains('div[draggable=true]', 'Documentar API')
            .trigger('dragstart', { dataTransfer });

        cy.wait(1000)
        cy.get('.column-done')
            .trigger('drop', { dataTransfer })
            .find('h3')
            .should('have.text', 'Done (4)')
        cy.get('.column-done')
            .and('include.text', 'Documentar API')
            .and('include.text', 'Criar documentação da API com Swagger')
    })
})