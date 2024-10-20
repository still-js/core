class TUIComponent extends ViewComponent {


    calendar = Prop(null);
    saveLabel = Prop('Salvar');
    editLabel = Prop('Editar');
    delLabel = Prop('Excluir');
    updateLabel = Prop('Actualizar');

    template = `
        <div>
            <div style="margin-top: 20px;">
                This is the calendar component
            </div>
            <div id="@dynCmpGeneratedId" style="height: 600px;">
            </div>
        <div>
    `;

    load() {


        const formatTime = (dateObj) => {
            /** @type {Date} */
            const date = dateObj.d.d;

            let hour = date.getHours();
            let min = date.getMinutes();
            hour = hour < 10 ? `0${hour}` : hour;
            min = min < 10 ? `0${min}` : min;

            return `${date.getHours()}:${date.getMinutes()}`
        }

        const Calendar = tui.Calendar;
        this.calendar = new Calendar(`#${this.dynCmpGeneratedId}`, {
            defaultView: 'week',
            useFormPopup: true,
            useDetailPopup: true,
            isReadOnly: false, //To allow edit, if true edit is not allowed
            week: {
                eventView: ['time', 'milestone', 'task'],
                taskView: false
            },
            template: {
                time(event) {
                    const { start, end, title } = event;

                    return `<span style="color: white; min-height:30px;">${title}</span>`;
                },
                allday(event) {
                    return `<span style="color: gray;">${event.title}</span>`;
                },
                popupSave: () => this.saveLabel,
                popupEdit: () => this.editLabel,
                popupUpdate: () => this.updateLabel,
                popupDelete: () => this.delLabel,

            },
            calendars: [
                {
                    id: 'cal1',
                    name: 'Personal',
                    backgroundColor: '#03bd9e',
                },
                {
                    id: 'cal2',
                    name: 'Work',
                    backgroundColor: '#00a9ff',
                },
            ],
        });

        /**
         * Change Task title
         */
        this.calendar.setOptions({
            template: {
                taskTitle() {
                    return `<span style="font-size: 11px; line-height: 1;">Tarefa <br> prioridade</span>`;
                },
            },
        });

        /**
         * Change Milestone title
         */
        this.calendar.setOptions({
            template: {
                milestoneTitle() {
                    return `<span style="font-size: 11px; line-height: 1;">Objectivo<br> do dia</span>`;
                },
            },
        });

        this.handleOnCreateEvent();

    }

    handleOnCreateEvent() {

        const calendar = this.calendar;
        this.calendar.on('beforeCreateEvent', async (data) => {

            const wasEventCreated = await this.onEventCreate();
            console.log(`Result of calling is: `, wasEventCreated);
            if (wasEventCreated) {
                calendar.createEvents([
                    data
                ]);
            }

        });

    }

    handleOnUpdateEvent() {

        const calendar = this.calendar;
        calendar.on('beforeUpdateEvent', ({ event, change }) => {
            console.log(`Update will happen: `, event);
            //calendar.updateEvent(event.id, event.calendarId, change);
        });

    }

    /**
     * Method signature for parent to call as even
     * @type {{componentEvent: true}} 
     * @returns { boolean } 
     * */
    onEventCreate() { }

}