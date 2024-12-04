class CreateButton extends ViewComponent {

    iconName = `create_new_folder`;
    label = `Novo`;
    color = `btn-primary`;

    template = `
        <button (click)="onClick()" type="button" class="btn @color waves-effect">
            <span style="display: flex; gap: 10px; align-items: center;">
                <i class="material-icons">@iconName</i>
                @label
            </span>
        </button>
    `;

    onClick() { }

}