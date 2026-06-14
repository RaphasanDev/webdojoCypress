describe('Formulario de Consultoria', () => {


    it('Deve solicitar consultoria individual', () => {
        cy.iniciar()
        cy.submeterLogin('papito@webdojo.com', 'katana123')
        cy.goTo('Formulário', 'Consultoria')

        cy.get('input[placeholder="Digite seu nome completo"]').type('Raphael Santos')
        cy.get('input[placeholder="Digite seu email"]').type('email@email.com')
        cy.get('input[placeholder="(00) 00000-0000"]').type('11999999999')
            .should('have.value', '(11) 99999-9999')
        cy.get('#consultancyType').select('In Company')
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select('In Company')

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .click()
            .should('be.checked')

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked')

        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type('123.456.789-00')
            .should('have.value', '123.456.789-00')
        const discoveryChannels = [
            'Instagram',
            'LinkedIn',
            'Udemy',
            'YouTube',
            'Indicação de Amigo'
        ]

        discoveryChannels.forEach(channel => {
            cy.contains('label', channel)
                .find('input')
                .click()
                .should('be.checked')
        })

        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/document.pdf', { force: true })

        cy.get('textarea[placeholder = "Descreva mais detalhes sobre sua necessidade"]')
            .type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
            .should('have.text', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')


        const techs = ['JavaScript', 'Python', 'Java', 'C#', 'Ruby']

        techs.forEach((tech => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')

            //c ***//label[text()='Tecnologias']
            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')
        }))


        /*cy.contains('label', 'Li e aceito os termos de uso')
            .find('input').click()*/
        cy.get('input[type="checkbox"]')
            .eq(5)
            .click()

            cy.contains('button', 'Enviar formulário')
            .should('be.visible')
            .click()

            cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
    })
})