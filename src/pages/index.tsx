import { DOCUMENT } from "@/documents"
import { javascript } from "@codemirror/lang-javascript"
import { EditorState } from "@codemirror/state"
import { EditorView, lineNumbers } from "@codemirror/view"
import { minimalSetup } from "codemirror"
import { useEffect, useRef, useState } from "react"


export default function Home() {
  const editorViewRef = useRef()
  const [editorView, setEditorView] = useState<EditorView>()

  useEffect(() => {
    const extensions = [
      minimalSetup,
      lineNumbers(),
      javascript({ jsx: false, typescript: true }),
      EditorState.readOnly.of(true),
      EditorView.editable.of(false),
    ]

    const view = new EditorView({
      doc: DOCUMENT,
      extensions,
      parent: editorViewRef.current,
    })

    setEditorView(view)
  }, [])

  useEffect(() => {
    return () => {
      editorView?.destroy()
    }
  }, [editorView])

  // @ts-expect-error
  return <main ref={editorViewRef} className="" />
}
