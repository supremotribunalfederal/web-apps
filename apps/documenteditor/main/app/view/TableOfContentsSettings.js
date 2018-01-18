/*
 *
 * (c) Copyright Ascensio System Limited 2010-2017
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at Lubanas st. 125a-25, Riga, Latvia,
 * EU, LV-1021.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

/**
 *  TableOfContentsSettings.js.js
 *
 *  Created by Julia Radzhabova on 26.12.2017
 *  Copyright (c) 2017 Ascensio System SIA. All rights reserved.
 *
 */

define([
    'common/main/lib/util/utils',
    'common/main/lib/component/MetricSpinner',
    'common/main/lib/component/ComboBox',
    'common/main/lib/view/AdvancedSettingsWindow'
], function () { 'use strict';

    DE.Views.TableOfContentsSettings = Common.Views.AdvancedSettingsWindow.extend(_.extend({
        options: {
            contentWidth: 500,
            height: 455
        },

        initialize : function(options) {
            var me = this;

            _.extend(this.options, {
                title: this.textTitle,
                template: [
                    '<div class="box" style="height:' + (me.options.height - 85) + 'px;">',
                        '<div class="content-panel" style="padding: 15px 10px;"><div class="inner-content">',
                            '<div class="settings-panel active">',
                                '<table cols="2" style="width: 100%;">',
                                    '<tr>',
                                        '<td class="padding-small">',
                                        '<div id="tableofcontents-chb-pages"></div>',
                                        '</td>',
                                        '<td rowspan="5" class="padding-small" style="vertical-align: top;">',
                                        '<div style="border: 1px solid #cbcbcb;width: 230px; height: 172px; float: right;">',
                                            '<div id="tableofcontents-img" style="width: 100%; height: 100%;"></div>',
                                        '</div>',
                                        '</td>',
                                    '</tr>',
                                    '<tr>',
                                        '<td class="padding-small">',
                                            '<div id="tableofcontents-chb-align"></div>',
                                        '</td>',
                                    '</tr>',
                                    '<tr>',
                                        '<td class="padding-large">',
                                            '<label class="input-label">' + me.textLeader + '</label>',
                                            '<div id="tableofcontents-combo-leader" class="input-group-nr" style="display: inline-block; width:95px; margin-left: 10px;"></div>',
                                        '</td>',
                                    '</tr>',
                                    '<tr>',
                                        '<td class="padding-large">',
                                            '<div id="tableofcontents-chb-links"></div>',
                                        '</td>',
                                    '</tr>',
                                    '<tr>',
                                        '<td class="padding-small">',
                                            '<label class="input-label padding-small" style="display: block;">' + me.textBuildTable + '</label>',
                                            '<div id="tableofcontents-radio-styles" class="padding-small" style="display: block;"></div>',
                                            '<div id="tableofcontents-radio-levels" class="" style="display: block;"></div>',
                                        '</td>',
                                    '</tr>',
                                    '<tr>',
                                        '<td class="padding-small" style="vertical-align: top;">',
                                            '<div id="tableofcontents-from-levels" style="width:220px;">',
                                                '<label class="input-label">' + me.textLevels + '</label>',
                                                '<div id="tableofcontents-spin-levels" style="display: inline-block; width:95px; margin-left: 10px;"></div>',
                                            '</div>',
                                            '<div id="tableofcontents-from-styles" class="hidden">',
                                                '<table><tr><td style="height: 25px;">',
                                                        '<label class="input-label" style="width: 144px; margin-left: 23px;">' + me.textStyle + '</label>',
                                                        '<label class="input-label" style="">' + me.textLevel + '</label>',
                                                    '</td></tr>',
                                                    '<tr><td>',
                                                        '<div id="tableofcontents-styles-list" class="header-styles-tableview" style="width:100%; height: 122px;"></div>',
                                                '</td></tr></table>',
                                            '</div>',
                                        '</td>',
                                        '<td class="padding-small" style="vertical-align: top;">',
                                            '<label class="input-label" style="margin-left: 15px;">' + me.textStyles + '</label>',
                                            '<div id="tableofcontents-combo-styles" class="input-group-nr" style="display: inline-block; width:95px; margin-left: 10px;"></div>',
                                        '</td>',
                                    '</tr>',
                                '</table>',
                            '</div></div>',
                        '</div>',
                    '</div>',
                    '<div class="separator horizontal"/>',
                    '<div class="footer center">',
                    '<button class="btn normal dlg-btn primary" result="ok" style="margin-right: 10px;  width: 86px;">' + me.okButtonText + '</button>',
                    '<button class="btn normal dlg-btn" result="cancel" style="width: 86px;">' + me.cancelButtonText + '</button>',
                    '</div>'
                ].join('')
            }, options);

            this.api        = options.api;
            this.handler    = options.handler;
            this.props      = options.props;
            this.startLevel = 1;
            this.endLevel = 3;

            Common.Views.AdvancedSettingsWindow.prototype.initialize.call(this, this.options);
        },

        render: function() {
            Common.Views.AdvancedSettingsWindow.prototype.render.call(this);
            var me = this;

            this.chPages = new Common.UI.CheckBox({
                el: $('#tableofcontents-chb-pages'),
                labelText: this.strShowPages,
                value: 'checked'
            });
            this.chPages.on('change', _.bind(function(field, newValue, oldValue, eOpts){
                this.chAlign.setDisabled(field.getValue()!=='checked');
                this.cmbLeader.setDisabled(field.getValue()!=='checked');
                if (this._changedProps) {
                }
            }, this));

            this.chAlign = new Common.UI.CheckBox({
                el: $('#tableofcontents-chb-align'),
                labelText: this.strAlign,
                value: 'checked'
            });

            this.cmbLeader = new Common.UI.ComboBox({
                el          : $('#tableofcontents-combo-leader'),
                style       : 'width: 85px;',
                menuStyle   : 'min-width: 85px;',
                editable    : false,
                cls         : 'input-group-nr',
                data        : [
                    { value: Asc.c_oAscTabLeader.None,      displayValue: this.textNone },
                    { value: Asc.c_oAscTabLeader.Dot,       displayValue: '....................' },
                    { value: Asc.c_oAscTabLeader.Hyphen,    displayValue: '-----------------' },
                    { value: Asc.c_oAscTabLeader.Underscore,displayValue: '__________' }
                ]
            });
            this.cmbLeader.setValue(Asc.c_oAscTabLeader.Dot);

            this.chLinks = new Common.UI.CheckBox({
                el: $('#tableofcontents-chb-links'),
                labelText: this.strLinks
            });
            this.chLinks.on('change', _.bind(function(field, newValue, oldValue, eOpts){
            }, this));

            this.radioLevels = new Common.UI.RadioBox({
                el: $('#tableofcontents-radio-levels'),
                labelText: this.textRadioLevels,
                name: 'asc-radio-content-build',
                checked: true
            });
            this.radioLevels.on('change', _.bind(function(field, newValue, eOpts) {
                if (newValue) {
                    this.levelsContainer.toggleClass('hidden', !newValue);
                    this.stylesContainer.toggleClass('hidden', newValue);
                    if (this._needUpdateOutlineLevels)
                        this.synchronizeLevelsFromStyles();
                }
            }, this));

            this.radioStyles = new Common.UI.RadioBox({
                el: $('#tableofcontents-radio-styles'),
                labelText: this.textRadioStyles,
                name: 'asc-radio-content-build'
            });
            this.radioStyles.on('change', _.bind(function(field, newValue, eOpts) {
                if (newValue) {
                    this.stylesContainer.toggleClass('hidden', !newValue);
                    this.levelsContainer.toggleClass('hidden', newValue);
                    if (this._needUpdateStyles)
                        this.synchronizeLevelsFromOutline();
                }
            }, this));

            this.cmbStyles = new Common.UI.ComboBox({
                el: $('#tableofcontents-combo-styles'),
                cls: 'input-group-nr',
                menuStyle: 'min-width: 150px;',
                editable: false,
                data: [
                    { displayValue: this.txtCurrent,     value: Asc.c_oAscNumberingFormat.Decimal },
                    { displayValue: this.txtSimple,     value: Asc.c_oAscNumberingFormat.Decimal },
                    { displayValue: this.txtStandard,     value: Asc.c_oAscNumberingFormat.Decimal },
                    { displayValue: this.txtModern,     value: Asc.c_oAscNumberingFormat.Decimal },
                    { displayValue: this.txtClassic,     value: Asc.c_oAscNumberingFormat.Decimal }
                ]
            });
            // this.cmbStyles.setValue();
            // this.cmbStyles.on('selected', _.bind(this.onStylesSelect, this));

            this.spnLevels = new Common.UI.CustomSpinner({
                el: $('#tableofcontents-spin-levels'),
                step: 1,
                width: 85,
                defaultUnit : "",
                value: 3,
                maxValue: 9,
                minValue: 1,
                allowDecimal: false,
                maskExp: /[1-9]/
            });
            this.spnLevels.on('change', _.bind(function(field, newValue, oldValue, eOpts){
                this._needUpdateStyles = true;
                this.startLevel = 1;
                this.endLevel = field.getNumberValue();
            }, this));

            this.stylesLevels = new Common.UI.DataViewStore();

            if (this.stylesLevels) {
                this.stylesList = new Common.UI.ListView({
                    el: $('#tableofcontents-styles-list', this.$window),
                    store: this.stylesLevels,
                    simpleAddMode: true,
                    showLast: false,
                    template: _.template(['<div class="listview inner" style=""></div>'].join('')),
                    itemTemplate: _.template([
                        '<div id="<%= id %>" class="list-item">',
                            '<div class="<% if (checked) { %>checked<% } %>"><%= name %></div>',
                            '<div>',
                                '<div class="input-field" style="width:40px;"><input type="text" class="form-control" value="<%= value %>" style="text-align: right;">',
                            '</div>',
                            '</div>',
                        '</div>'
                    ].join(''))
                });
                this.stylesList.on('item:change', _.bind(this.onItemChange, this));
                this.stylesList.on('item:add', _.bind(this.addEvents, this));
            }

            this.levelsContainer = $('#tableofcontents-from-levels');
            this.stylesContainer = $('#tableofcontents-from-styles');
            this.afterRender();
        },

        afterRender: function() {
            this._setDefaults(this.props);
        },

        show: function() {
            Common.Views.AdvancedSettingsWindow.prototype.show.apply(this, arguments);
        },

        _setDefaults: function (props) {
            var me = this,
                styles = [];
            _.each(window.styles.get_MergedStyles(), function (style) {
                var level = me.api.asc_GetHeadingLevel(style.get_Name());
                styles.push({
                    name: style.get_Name(),
                    allowSelected: false,
                    checked: false,
                    value: '',
                    headerLevel: (level>0) ? level+1 : -1 // -1 if is not header
                });
            });

            if (props) {
                var value = props.get_Hyperlink();
                this.chLinks.setValue((value !== null && value !== undefined) ? value : 'indeterminate', true);

                var start = props.get_OutlineStart(),
                    end = props.get_OutlineEnd(),
                    count = props.get_StylesCount();

                this.startLevel = start;
                this.endLevel = end;

                if ((start<0 || end<0) && count<1) {
                    start = 1;
                    end = 9;
                    this.spnLevels.setValue(end, true);
                }

                var disable_outlines = false;
                for (var i=0; i<count; i++) {
                    var style = props.get_StyleName(i),
                        level = props.get_StyleLevel(i),
                        rec = _.findWhere(styles, {name: style});
                    if (rec) {
                        rec.checked = true;
                        rec.value = level;
                        if (rec.headerLevel !== level)
                            disable_outlines = true;
                    } else {
                        styles.push({
                            name: style,
                            allowSelected: false,
                            checked: true,
                            value: level,
                            headerLevel: -1
                        });
                        disable_outlines = true;
                    }
                }

                if (start>0 && end>0) {
                    for (var i=start; i<=end; i++) {
                        var rec = _.findWhere(styles, {headerLevel: i});
                        if (rec) {
                            rec.checked = true;
                            rec.value = i;
                        }
                    }
                }
                var new_start = -1, new_end = -1, empty_index = -1;
                for (var i=0; i<9; i++) {
                    var rec = _.findWhere(styles, {headerLevel: i+1});
                    if (rec) {
                        var headerLevel = rec.headerLevel,
                            level = rec.value;
                        if (headerLevel == level) {
                            if (empty_index<1) {
                                if (new_start<1)
                                    new_start = level;
                                new_end = level;
                            } else {
                                new_start = new_end = -1;
                                disable_outlines = true;
                                break;
                            }
                        } else if (!rec.checked) {
                            (new_start>0) && (empty_index = i+1);
                        } else {
                            new_start = new_end = -1;
                            disable_outlines = true;
                            break;
                        }
                    }
                }

                this.spnLevels.setValue(new_end>0 ? new_end : '', true);
                this.spnLevels.setDisabled(disable_outlines || new_start>1 );
            }
            this.stylesLevels.reset(styles);
            if (this.spnLevels.isDisabled())
                this.radioStyles.setValue(true);
            // this.api.SetDrawImagePlaceContents('tableofcontents-img', props);

            this._changedProps = new Asc.CTableOfContentsPr();
        },

        synchronizeLevelsFromOutline: function() {
            var start = 1, end = this.spnLevels.getNumberValue();
            this.stylesLevels.each(function (style) {
                var header = style.get('headerLevel');
                if (header>=start && header<=end) {
                    style.set('checked', true);
                    style.set('value', header);
                } else {
                    style.set('checked', false);
                    style.set('value', '');
                }
            });
            this._needUpdateStyles = false;
        },

        synchronizeLevelsFromStyles: function() {
            var new_start = -1, new_end = -1, empty_index = -1,
                disable_outlines = false;

            for (var i=0; i<9; i++) {
                var rec = this.stylesLevels.findWhere({headerLevel: i+1});
                if (rec) {
                    var headerLevel = rec.get('headerLevel'),
                        level = rec.get('value');
                    if (headerLevel == level) {
                        if (empty_index<1) {
                            if (new_start<1)
                                new_start = level;
                            new_end = level;
                        } else {
                            new_start = new_end = -1;
                            disable_outlines = true;
                            break;
                        }
                    } else if (!rec.get('checked')) {
                        (new_start>0) && (empty_index = i+1);
                    } else {
                        new_start = new_end = -1;
                        disable_outlines = true;
                        break;
                    }
                }
            }
            if (new_start<0 && new_end<0) {
                var rec = this.stylesLevels.findWhere({checked: true});
                if (rec) { // has checked style
                    disable_outlines = true;
                } else { // all levels are empty
                    new_start = 1;
                    new_end = 9;
                }
            }

            this.startLevel = new_start;
            this.endLevel = new_end;

            this.spnLevels.setValue(new_end>0 ? new_end : '', true);
            this.spnLevels.setDisabled(disable_outlines || new_start>1 );
            this._needUpdateOutlineLevels = false;
        },

        getSettings: function () {
            var props = new Asc.CTableOfContentsPr();

            props.put_Hyperlink(this.chLinks.getValue() == 'checked');
            props.put_ShowPageNumbers(this.chPages.getValue() == 'checked');
            if (this.chPages.getValue() == 'checked')
                props.put_RightAlignTab(this.chAlign.getValue() == 'checked');
            props.put_TabLeader(this.cmbLeader.getValue());

            props.clear_Styles();
            if (this._needUpdateOutlineLevels) {
                this.synchronizeLevelsFromStyles();
            }
            if (!this._needUpdateStyles)  // if this._needUpdateStyles==true - fill only OutlineRange
                this.stylesLevels.each(function (style) {
                    if (style.get('checked'))
                        props.add_Style(style.get('name'), style.get('value'));
                });
            props.put_OutlineRange(this.startLevel, this.endLevel);
            return props;
        },

        addEvents: function(listView, itemView, record) {
            var input = itemView.$el.find('input'),
                me = this;
            input.on('keypress', function(e) {
                var charCode = String.fromCharCode(e.which);
                if(!/[1-9]/.test(charCode) && !e.ctrlKey && e.keyCode !== Common.UI.Keys.DELETE && e.keyCode !== Common.UI.Keys.BACKSPACE &&
                    e.keyCode !== Common.UI.Keys.LEFT && e.keyCode !== Common.UI.Keys.RIGHT && e.keyCode !== Common.UI.Keys.HOME &&
                    e.keyCode !== Common.UI.Keys.END && e.keyCode !== Common.UI.Keys.ESC && e.keyCode !== Common.UI.Keys.INSERT &&
                    e.keyCode !== Common.UI.Keys.TAB  || input.val().length>1){
                    e.preventDefault();
                    e.stopPropagation();
                }

            });
            input.on('input', function(e) {
                // console.log(input.val());
                var newval = !_.isEmpty(input.val());
                if (record.get('checked') !== newval) {
                    record.set('checked', !_.isEmpty(input.val()));
                }
                record.set('value', input.val());
                me._needUpdateOutlineLevels = true;
            });
        },

        onItemChange: function(listView, itemView, record) {
            this.addEvents(listView, itemView, record);
            setTimeout(function(){
                itemView.$el.find('input').focus();
            }, 10);
        },

        textTitle:  'Table of Contents',
        textLeader: 'Leader',
        textBuildTable: 'Build table of contents from',
        textLevels: 'Levels',
        textStyles: 'Styles',
        strShowPages: 'Show page numbers',
        strAlign: 'Right align page numbers',
        strLinks: 'Format Table of Contents as links',
        textNone: 'None',
        textRadioLevels: 'Outline levels',
        textRadioStyles: 'Selected styles',
        textStyle: 'Style',
        textLevel: 'Level',
        cancelButtonText: 'Cancel',
        okButtonText    : 'Ok',
        txtCurrent: 'Current',
        txtSimple: 'Simple',
        txtStandard: 'Standard',
        txtModern: 'Modern',
        txtClassic: 'Classic'

    }, DE.Views.TableOfContentsSettings || {}))
});