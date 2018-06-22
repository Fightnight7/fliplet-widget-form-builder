var UPLOADS_FOLDER_NAME = 'Uploaded from Form';

Fliplet.FormBuilder.field('wysiwyg', {
  name: 'WYSIWYG Editor',
  category: 'Advanced',
  props: {
    placeholder: {
      type: String
    },
    rows: {
      type: Number,
      default: 8
    }
  },
  methods: {
    onReset: function() {
      $(this.$refs.textarea).summernote('reset');
    }
  },
  mounted: function () {
    var $vm = this;
    var uploadsFolder;
    var toast;

    var $el = $(this.$refs.textarea).summernote({
      placeholder: this.placeholder,
      tabsize: 2,
      height: this.rows * 25,
      callbacks: {
        onChange: function(contents) {
          $vm.$emit('_input', $vm.name, contents);
        },
        onImageUpload: function(files) {
          var toast;

          Fliplet.UI.Toast({
            message: 'Uploading file...',
            progress: true
          }).then(function (result) {
            toast = result;

            if (uploadsFolder) {
              return;
            }

            return Fliplet.Media.Folders.get().then(function (response) {
              uploadsFolder = _.find(response.folders, { name: UPLOADS_FOLDER_NAME });

              if (uploadsFolder) {
                return;
              }

              return Fliplet.Media.Folders.create({ name: UPLOADS_FOLDER_NAME }).then(function (folder) {
                uploadsFolder = folder;
              });
            });
          }).then(function () {
            var data = new FormData();

            Array.prototype.forEach.call(files, function(file) {
              data.append('image', file);
            });

            return Fliplet.Media.Files.upload({
              data: data,
              folderId: uploadsFolder.id,
              progress: function (percentage) {
                toast.setProgress(percentage/100);
              }
            }).then(function (files) {
              toast.dismiss();
              files.forEach(function (file) {
                var image = document.createElement('img');
                image.src = file.url;
                $el.summernote('insertNode', image);
              });
            });
          }).catch(function (err) {
            console.error(err);
          });
        }
      }
    });

    Fliplet.FormBuilder.on('reset', this.onReset);
  },
  destroyed: function() {
    $(this.$refs.textarea).summernote('destroy');
    Fliplet.FormBuilder.off('reset', this.onReset);
  }
});
