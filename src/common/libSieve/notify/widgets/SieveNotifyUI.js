/*
 * The contents of this file are licensed. You may obtain a copy of
 * the license at https://github.com/thsmi/sieve/ or request it via
 * email from the author.
 *
 * Do not remove or change this comment.
 *
 * The initial author of the code is:
 *   Thomas Schmid <schmid-thomas@gmx.net>
 *
 */

(function () {

  "use strict";

  /* global $: false */
  /* global SieveTestDialogBoxUI */
  /* global SieveActionDialogBoxUI */

  /* global SieveStringListWidget */
  /* global SieveStringWidget */
  /* global SieveMatchTypeWidget */
  /* global SieveComparatorWidget */

  /* global SieveOverlayItemWidget */

  /* global SieveDesigner */

  /**
   * Implements an UI for the notify action.
   */
  class SieveNotifyActionUI extends SieveActionDialogBoxUI {

    /**
     * Gets the uri for the notification method.
     *
     * @returns {SieveString}
     *   the uri as string.
     */
    method() {
      return this.getSieve().getElement("method");
    }

    /**
     *
     */
    options() {
      return this.getSieve().getElement("options").getElement("options");
    }

    /**
     *
     */
    from() {
      return this.getSieve().getElement("from").getElement("from");
    }

    /**
     *
     */
    message() {
      return this.getSieve().getElement("message").getElement("message");
    }

    /**
     * @inheritdoc
     */
    onLoad() {

      (new SieveStringWidget("#sivNotifyMethod"))
        .init(this.method());


      if (this.getSieve().enable("from"))
        document.querySelector("#cbxSieveNotifyFrom").checked = true;

      (new SieveStringWidget("#txtSieveNotifyFrom"))
        .init(this.from());


      if (this.getSieve().enable("options"))
        document.querySelector("#cbxSieveNotifyOptions").checked = true;

      (new SieveStringListWidget("#txtSieveNotifyOptions"))
        .init(this.options());


      if (this.getSieve().enable("importance"))
        document.querySelector("#cbxSieveNotifyImportance").checked = true;

      const importance = this.getSieve().getElement("importance").getElement("importance").value();
      document.querySelector("input[name=sivNotifyImportance][value='" + importance + "']").checked = true;

      document.querySelector("input[name=sivNotifyMessage][value='" + this.getSieve().enable("message") + "']").checked = true;
      document.querySelector("#txtSieveNotifyMessage").value = this.message().value();
    }

    /**
     * @inheritdoc
     */
    onSave() {
      (new SieveStringWidget("#sivNotifyMethod"))
        .save(this.method());

      // Importance...

      this.getSieve().enable("options",
        document.querySelector("#cbxSieveNotifyOptions").checked);

      (new SieveStringListWidget("#txtSieveNotifyOptions"))
        .save(this.options());

      this.getSieve().enable("from",
        document.querySelector("#cbxSieveNotifyFrom").checked);
      (new SieveStringWidget("#txtSieveNotifyFrom"))
        .save(this.from());


      this.getSieve().enable("importance",
        document.querySelector("#cbxSieveNotifyImportance").checked);
      const importance = document.querySelector("input[name=sivNotifyImportance]:checked").value();

      this.getSieve()
        .getElement("importance")
        .getElement("importance")
        .value(importance);


      this.getSieve().enable("message",
        document.querySelector("#rbxSieveNotifyMessageCustom").checked);
      this.message().value(
        document.querySelector("#txtSieveNotifyMessage").value);

      return true;
    }

    /**
     * @inheritdoc
     */
    getTemplate() {
      return "./notify/templates/SieveNotifyActionUI.html";
    }

    /**
     * @inheritdoc
     */
    getSummary() {
      return $("<div/>")
        .html("Notify").get(0);
    }
  }

  /**
   *
   */
  class SieveNotifyMethodCapabilityUI extends SieveTestDialogBoxUI {

    /**
     * Gets the match type.
     *
     * @returns {SieveAbstractElement}
     *   the element's matchtype field
     */
    matchtype() {
      return this.getSieve().getElement("match-type");
    }

    /**
     * Gets the comparator type.
     *
     * @returns {SieveAbstractElement}
     *   the element's comparator field
     */
    comparator() {
      return this.getSieve().getElement("comparator");
    }

    /**
     *
     */
    keys() {
      return this.getSieve().getElement("keys");
    }

    /**
     *
     */
    uri() {
      return this.getSieve().getElement("uri");
    }

    /**
     *
     */
    capability() {
      return this.getSieve().getElement("capability");
    }

    /**
     * @inheritdoc
     */
    onLoad() {
      (new SieveMatchTypeWidget("#sivNotifyMatchTypes"))
        .init(this.matchtype());
      (new SieveComparatorWidget("#sivNotifyComparator"))
        .init(this.comparator());

      (new SieveStringListWidget("#sivNotifyKeyList"))
        .init(this.keys());

      (new SieveStringWidget("#txtSieveNotifyUri"))
        .init(this.uri());
      (new SieveStringWidget("#txtSieveNotifyCapability"))
        .init(this.capability());
    }

    /**
     * @inheritdoc
     */
    onSave() {
      (new SieveMatchTypeWidget("#sivNotifyMatchTypes"))
        .save(this.matchtype());
      (new SieveComparatorWidget("#sivNotifyComparator"))
        .save(this.comparator());

      (new SieveStringListWidget("#sivNotifyKeyList"))
        .save(this.keys());

      (new SieveStringWidget("#txtSieveNotifyUri"))
        .save(this.uri());
      (new SieveStringWidget("#txtSieveNotifyCapability"))
        .save(this.capability());

      return true;
    }

    /**
     * @inheritdoc
     */
    getTemplate() {
      return "./notify/templates/SieveNotifyMethodCapabilityTestUI.html";
    }

    /**
     * @inheritdoc
     */
    getSummary() {
      return $("<div/>")
        .html("Check Notify Method Capability").get(0);
    }
  }


  /**
   *
   */
  class SieveValidNotifyMethodUI extends SieveTestDialogBoxUI {

    /**
     *
     */
    uris() {
      return this.getSieve().getElement("uris");
    }

    /**
     * @inheritdoc
     */
    onLoad() {
      (new SieveStringListWidget("#sivNotifyUris"))
        .init(this.uris());
    }

    /**
     * @inheritdoc
     */
    onSave() {
      (new SieveStringListWidget("#sivNotifyUris"))
        .save(this.uris());

      return true;
    }

    /**
     * @inheritdoc
     */
    getTemplate() {
      return "./notify/templates/SieveValidNotifyMethodTestUI.html";
    }

    /**
     * @inheritdoc
     */
    getSummary() {
      return $("<div/>")
        .html(" Notify methods are supported " + this.uris().toScript()).get(0);
    }
  }

  /**
   * Implements an abstract overlay widget which is used by
   * the copy overlay for the fileinto action as well as the
   * redirect action.
   */
  class SieveModifierEncodeUrlWidget extends SieveOverlayItemWidget {

    /**
     * @inheritdoc
     */
    static nodeType() {
      return "modifier/";
    }

    /**
     * @inheritdoc
     */
    static nodeName() {
      return "modifier/15";
    }

    /**
     * @inheritdoc
     **/
    getTemplate() {
      return "./notify/templates/SieveEncodeUrlUI.html";
    }

    /**
     * @inheritdoc
     */
    static isCapable(capabilities) {
      return capabilities.hasCapability("enotify") && capabilities.hasCapability("variables");
    }

    /**
     * @inheritdoc
     */
    load(sivElement) {
      if (sivElement.enable("modifier/15"))
        document.querySelector("#cbxModifier15").checked = true;
    }

    /**
     * @inheritdoc
     */
    save(sivElement) {

      let value = null;
      const status = document.querySelector("#cbxModifier15").checked;
      if (status)
        value = document.querySelector("#cbxModifier15").value;

      sivElement.getElement("modifier/15").setElement(value);
      sivElement.enable("modifier/15", status);
    }
  }

  // ************************************************************************************

  if (!SieveDesigner)
    throw new Error("Could not register Notify");

  SieveDesigner.register2(SieveModifierEncodeUrlWidget);

  SieveDesigner.register("action/notify", SieveNotifyActionUI);
  SieveDesigner.register("test/notify_method_capability", SieveNotifyMethodCapabilityUI);
  SieveDesigner.register("test/valid_notify_method", SieveValidNotifyMethodUI);

})(window);
