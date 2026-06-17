//O cypress tem uma limitação para interagir com iframes. Existem plugins que ajudam nessa questão
//Existem outros códigos para contornar essa limitação, como acessar o conteúdo do iframe através do contentDocument 
// e depois envolver esse conteúdo com o cy.wrap para poder interagir com ele, como mostrado no exemplo abaixo:

describe('iframe', () => {
    it.only('Deve tocar o video', () => {
        cy.login() 
        cy.contains('Video')
        .click()

        cy.get('iframe[title="Video Player"]')
            .should('exist')
            .its('0.contentDocument.body')
            .then(cy.wrap)
            .as('iFramePLayer')
        cy.get('@iFramePLayer')
            .find('.play-button')
            .click()

        cy.get('@iFramePLayer')
            .find('.pause-button')
            .should('be.visible')
    })
})